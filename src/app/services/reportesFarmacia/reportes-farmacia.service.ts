import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesFarmaciaService {

  constructor(private http: HttpClient) {}

  getReportesFarmacia(data:any): Observable<any> {
    let url = "http://localhost:3000/api/reportesFarmacia/"
    return this.http.post<any>(url,data);
  }
}
