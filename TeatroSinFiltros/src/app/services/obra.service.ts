import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObraService {
  private apiUrl = 'http://localhost:3000/api/obras'; // Cambia a tu URL del servidor Node.js

  constructor(private http: HttpClient) { }

  getObras(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addObra(obra: any): Observable<any> {
    return this.http.post(this.apiUrl, obra);
  }
}
