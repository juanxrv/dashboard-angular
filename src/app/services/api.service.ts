import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';
import Env from '../environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private env = new Env();
  private apiurl!: string;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    this.apiurl = this.env.apiurl;
  }

  getData(uri: string): Observable<any> {
    return this.httpClient
      .get(`${this.apiurl}/${uri}`, {
        headers: { Authorization: `Bearer ${this.authService.getToken()}` },
      })
      .pipe(
        tap({
          error: (error: any) => {
            if (error.status === 401) {
              this.authService.logout();
              this.router.navigate(['']);
            }
          },
          next: () => {},
        })
      );
  }

  postData({ uri, data }: any): Observable<any> {
    return this.httpClient.post(`${this.apiurl}/${uri}`, data, {
      headers: { Authorization: `Bearer ${this.authService.getToken()}` },
    });
  }

  putData({ uri, data }: any): Observable<any> {
    return this.httpClient.put(`${this.apiurl}/${uri}`, data, {
      headers: { Authorization: `Bearer ${this.authService.getToken()}` },
    });
  }

  deleteData({ uri, id }: any) {
    return this.httpClient.delete(`${this.apiurl}/${uri}/${id}`, {
      headers: { Authorization: `Bearer ${this.authService.getToken()}` },
    });
  }
}
