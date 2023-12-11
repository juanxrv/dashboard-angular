import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import Env from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private env = new Env()
  private host!: string;
  public token!: string;
  public userData!: (User|null)

  constructor(private http: HttpClient) {
    this.host = `${this.env.apiurl}/auth`;
  }

  login({ username, password }: any): Observable<object> {
    return this.http.post(`${this.host}/login`, { userName: username, password: password })
  }

  user(): Observable<User> {
    return this.http.get<User>(`${this.host}/me`, { headers: { "Authorization": `Bearer ${this.token}` } })
  }

  signup({ nombre, apellido, userName, password, email, role }: any): Observable<object> {
    return this.http.post(`${this.host}/register`, {
      nombre: nombre,
      apellido: apellido,
      userName: userName,
      password: password,
      email: email,
      role: role
    })
  }

  logout(): Promise<(boolean | string)> {
    return new Promise((resolve, reject) => {
      try {
        localStorage.removeItem("token")
        
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false
    }
    this.token = token
    return true
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem("token", token)
  }

  getToken(): string {
    return this.token;
  }
}
