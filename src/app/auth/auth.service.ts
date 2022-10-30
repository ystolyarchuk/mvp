import { Injectable } from '@angular/core';
import { DataService } from '../shared/data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private dataService: DataService, private http: HttpClient) {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token;
  }

  public setAccessToken(response) {
    localStorage.setItem('access_token', response.access_token);
  }
  public getAccessToken(): string {
    if (localStorage.getItem('access_token') === null) {
      localStorage.clear();
    }
    return localStorage.getItem('access_token');
  }
  public refreshToken() {
    return this.dataService.post(`/auth/refresh`, { token: this.getAccessToken() });
  }

  public hasToken(): boolean {
    return !!localStorage.getItem('access_token');
  }

  public login(body) {
    return this.dataService.post('/auth/login', body);
  }
  public reg(body) {
    return this.dataService.post('/auth/register', body);
  }

  public logout() {
    return this.dataService.post('/auth/logout', { token: localStorage.getItem('access_token') });
  }
  public clearStorage() {
    localStorage.removeItem('access_token');
  }
  public getMe() {
    return this.dataService.post('/auth/me', {});
  }
}
