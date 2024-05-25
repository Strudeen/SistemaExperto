import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlmacenDatos } from 'src/app/models/almacen';


@Injectable({
  providedIn: 'root'
})
export class AlertaCaducidadService {

  constructor(private http: HttpClient) {}

  getAlertasAlmacen(): Observable<AlmacenDatos[]> {
    let url = "http://localhost:3000/api/alertasAlmacen/"
    return this.http.get<AlmacenDatos[]>(url);
  }
}
