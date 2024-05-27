import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AlmacenDatos } from 'src/app/models/almacen';


@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private http: HttpClient) {}

  getReportesAlmacen(data:any): Observable<any> {
    let url = "http://localhost:3000/api/reportes/"
    return this.http.post<any>(url,data);
  }
}