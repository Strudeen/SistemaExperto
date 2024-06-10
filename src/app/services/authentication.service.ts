import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Authentication } from '../models/authentication';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) { }

  signIn(auth: Authentication): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/api/authentication/signIn/`, auth)
      .pipe(
        catchError((error) => {
          let errorMessage = 'An unknown error occurred!';
          if (error.error.msg) {
            errorMessage = error.error.msg;
          }
          return throwError(errorMessage);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/authentication/signIn']);
  }

  getUsuarioRol(): string {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.user.rol; // Asegúrate de que el camino al rol es correcto
    }
    return '';
  }
}
