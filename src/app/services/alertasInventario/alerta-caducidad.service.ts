import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { InventarioDatos } from 'src/app/models/inventario';


@Injectable({
  providedIn: 'root'
})
export class AlertaCaducidadService {

  constructor(private http: HttpClient) {}

  getAlertasInventario(): Observable<InventarioDatos[]> {
    let url = "http://localhost:3000/api/alertasInventario/"
    return this.http.get<InventarioDatos[]>(url).pipe(
      tap(alertas => {
        alertas.forEach(alerta => {
          if (alerta.fechaCaducidad) {
            let fechaCaducidad = new Date(alerta.fechaCaducidad);
            let diaCaducidad = fechaCaducidad.toLocaleDateString('es-BO', { day: '2-digit' });
            let mesCaducidad = fechaCaducidad.toLocaleDateString('es-BO', { month: 'long' });
            let anoCaducidad = fechaCaducidad.toLocaleDateString('es-BO', { year: 'numeric' });
            let fechaFormateada = ` ${diaCaducidad} de ${mesCaducidad.charAt(0).toUpperCase() + mesCaducidad.slice(1)} de ${anoCaducidad}`;
            alerta.fechaCaducidad = fechaFormateada;
          }
        });
      }),
    );
  }
}
