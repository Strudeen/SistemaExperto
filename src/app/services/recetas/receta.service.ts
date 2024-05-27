import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Receta, RecetaForm } from 'src/app/models/receta';
import { CrearUsuario, Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {
  private subject$: BehaviorSubject<Receta[]> = new BehaviorSubject<Receta[]>([]);
  public readonly data$: Observable<Receta[]> = this.subject$.asObservable();
  constructor(private http: HttpClient) { }


  public updateTableData() {
    this.getRecetas().subscribe((data) => {
      this.subject$.next(data);
    });
  }

  getRecetas(): Observable<Receta[]> {
    let url = "http://localhost:3000/api/receta";
    return this.http.get<Receta[]>(url).pipe(
      tap(receta => {
        receta.forEach(receta => {
          if (receta.fechaReceta) {
            let fechaCaducidad = new Date(receta.fechaReceta);
            let diaCaducidad = fechaCaducidad.toLocaleDateString('es-BO', { day: '2-digit' });
            let mesCaducidad = fechaCaducidad.toLocaleDateString('es-BO', { month: 'long' });
            let anoCaducidad = fechaCaducidad.toLocaleDateString('es-BO', { year: 'numeric' });
            let fechaFormateada = ` ${diaCaducidad} de ${mesCaducidad.charAt(0).toUpperCase() + mesCaducidad.slice(1)} de ${anoCaducidad}`;
            receta.fechaReceta = fechaFormateada;
          }
        });
      }),
    );
  }
  postReceta(CrearReceta: RecetaForm): Observable<any> {

    let url = "http://localhost:3000/api/receta";

    return this.http.post<any>(url, CrearReceta);
  }
  
  getReceta(recetaId: string): Observable<Receta> {
    const url = `http://localhost:3000/api/receta/${recetaId}`;
    return this.http.get<Receta>(url);
  }

  putReceta(recetaId: string, updatedUsuarioData: RecetaForm): Observable<any> {
    const url = `http://localhost:3000/api/receta/${recetaId}`;
    console.log(JSON.stringify(updatedUsuarioData));
    return this.http.put(url, updatedUsuarioData); 
  }

  delReceta(recetaId: string, state:boolean): Observable<any> {
    const url = `http://localhost:3000/api/receta/${recetaId}/delReceta`;
    return this.http.put(url, {state}); 
  }
}
