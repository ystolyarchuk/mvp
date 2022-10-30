import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, finalize, map, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { DataService } from '../data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  private isRefreshingToken = false;
  private tokenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor(
    private router: Router,
    private authService: AuthService,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private notifyService: NotifyService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent> | HttpHeaderResponse | HttpResponse<any> | any {
    return next.handle(this.addTokenToRequest(request, this.authService.getAccessToken())).pipe(
      catchError((err) => {
        if (err.status === 500) {
          this.snackBar.open('Error 500: Something went wrong...', null, { panelClass: 'error' });
        }
        if (
          err &&
          err.error.responseStatus === 403 &&
          (err.error.responseMessage === 'Token has expired and can no longer be refreshed' ||
            err.error.responseMessage === 'User does not have the right roles.')
        ) {
          this.authService.logout();
          this.authService.clearStorage();
          this.router.navigate(['/login']);
          return throwError(err);
        } else if (err && err.error.responseStatus === 403 && err.error.responseMessage === 'Token is Expired') {
          return this.handle401Error(request, next).pipe(
            map((event: HttpEvent<any>) => {
              if (event instanceof HttpResponse) {
                event = event.clone();
              }
              return event;
            })
          );
        } else if (err && err.error.responseStatus === 403) {
          this.authService.logout();
          this.authService.clearStorage();
          this.router.navigate(['/login']);
          return throwError(err);
        } else if (err && err.error.responseStatus === 401) {
          this.snackBar.open(err.error.responseMessage, null, { panelClass: 'error' });
        } else if (err && err.error.responseStatus === 422) {
          this.notifyService.showError(err.error);
        }
        return throwError(err);
      }),
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          event = event.clone();
        }
        return event;
      })
    );
  }

  private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: 'bearer ' + token,
      },
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    // 401 errors are most likely going to be because we have an expired token that we need to refresh.
    if (this.isRefreshingToken) {
      // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
      // which means the new token is ready and we can retry the request again
      return this.tokenSubject.pipe(
        filter((result) => result !== null),
        take(1),
        switchMap(() => next.handle(this.addTokenToRequest(request, this.authService.getAccessToken())))
      );
    } else {
      this.isRefreshingToken = true;
      // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
      this.tokenSubject.next(null);
      return this.authService.refreshToken().pipe(
        switchMap((response: any) => {
          this.authService.setAccessToken(response);
          this.tokenSubject.next(true);
          return next.handle(this.addTokenToRequest(request, this.authService.getAccessToken()));
        }),
        finalize(() => (this.isRefreshingToken = false))
      );
    }
  }
}
