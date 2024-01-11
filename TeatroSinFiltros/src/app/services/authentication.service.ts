import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class AuthenticationService {
  private _isLoggedIn = false;
  private _userRole: string = '';
  private loginUrl = 'http://localhost:3000/api/login'; 

  constructor(private http: HttpClient) {}

  login(credentials: { nombre_usuario: string; contrasena: string }): Observable<any> {
    return this.http.post<any>(this.loginUrl, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userRole', response.rol);
        this._isLoggedIn = true;
        this._userRole = response.rol; 
        console.log("Login successful:", this._isLoggedIn, this._userRole);
      }),
      catchError(this.handleError)
    );
  }

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  get getUserRole(): string {
    return this._userRole;
  }
  

  private handleError(error: HttpErrorResponse) {
    let errorMsg = 'Ocurrió un error desconocido';
    if (error.status === 401) {
      errorMsg = 'Contraseña incorrecta';
    } else if (error.status === 404) {
      errorMsg = 'Usuario no encontrado';
    }
    return throwError(() => new Error(errorMsg));
  }
}
