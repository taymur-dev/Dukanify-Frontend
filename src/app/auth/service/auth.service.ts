import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:7000/api/auth';
  private apiUrlSignup = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  loginUser(credentials: { email: string; password: string }): Observable<any> {
    console.log('Sending login request to:', `${this.apiUrl}/login`);
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  storeToken(token: string): void {
    localStorage.setItem('Auth Token', token);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  register(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrlSignup}/signup`, payload);
  }
}
