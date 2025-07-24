import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { LoginRequest, LoginResponse } from '../../../core/models/login.model';
import { ApiResponse } from './../../../core/models/api-response.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';

  private currentUserSubject = new BehaviorSubject<any>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() { 
    this.checkTokenValidity();
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<ApiResponse<LoginResponse>>(`${environment.urlApi}/auth/login`, credentials)
      .pipe(
        map(response => {
          if (!response.success || !response.data) {
            throw new Error(response.message || 'Error en el login');
          }
          return response.data;
        }),
        tap(loginResponse => {
          // Guardar token y datos del usuario
          this.setSession(loginResponse);
          this.currentUserSubject.next(loginResponse.user);
        }),
        catchError(this.handleError)
      );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return !!token && !this.isTokenExpired(token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private setSession(authResult: LoginResponse): void {
    localStorage.setItem(this.TOKEN_KEY, authResult.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(authResult.user));
    
    if (authResult.refreshToken) {
      localStorage.setItem('refresh_token', authResult.refreshToken);
    }
  }

  private getUserFromStorage(): any {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp < Date.now() / 1000;
    } catch (error) {
      return true;
    }
  }

  private checkTokenValidity(): void {
    if (!this.isAuthenticated()) {
      this.logout();
    }
  }

  private handleError = (error: any): Observable<never> => {
    let errorMessage = 'Ha ocurrido un error inesperado';
    
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return throwError(() => errorMessage);
  };
}
