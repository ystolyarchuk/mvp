import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  public get(url: string) {
    return this.http.get(`${environment.api}${environment.name}${url}`, this.httpOptions());
  }

  public post(url: string, body) {
    return this.http.post(`${environment.api}${environment.name}${url}`, body, this.httpOptions());
  }

  public put(url: string, body) {
    return this.http.put(`${environment.api}${environment.name}${url}`, body, this.httpOptions());
  }

  public delete(url: string) {
    return this.http.delete(`${environment.api}${environment.name}${url}`, this.httpOptions());
  }

  public getShare(url: string) {
    return this.http.get(`${environment.api}${url}`, this.httpOptions());
  }

  public postShare(url: string, body) {
    return this.http.post(`${environment.api}${url}`, body, this.httpOptions());
  }

  public putShare(url: string, body) {
    return this.http.put(`${environment.api}${url}`, body, this.httpOptions());
  }

  public deleteShare(url: string) {
    return this.http.delete(`${environment.api}${url}`, this.httpOptions());
  }

  private httpOptions() {
    return {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      }),
    };
  }
}
