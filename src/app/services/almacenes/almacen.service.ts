import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Almacen, CrearAlmacen } from 'src/app/models/almacen';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {

  private subject$: BehaviorSubject<Almacen[]> = new BehaviorSubject<Almacen[]>([]);
  public readonly data$: Observable<Almacen[]> = this.subject$.asObservable();
  constructor(private http: HttpClient) { }

  public updateTableData() {
    this.getAlmacenes().subscribe((data) => {
      this.subject$.next(data);
    });
  }


  getAlmacenes(): Observable<Almacen[]> {
    let url = "http://localhost:3000/api/almacen";
    return this.http.get<Almacen[]>(url);
  }

  postAlmacen(crearAlmacen: CrearAlmacen): Observable<any> {

    let url = "http://localhost:3000/api/almacen";
    return this.http.post<any>(url, crearAlmacen);
  }

  getAlmacen(almacenId: string): Observable<Almacen> {
    const url = `http://localhost:3000/api/almacen/${almacenId}`;
    return this.http.get<Almacen>(url);
  }

  putAlmacen(almacenId: string, updatedAlmacenData: CrearAlmacen): Observable<any> {
    const url = `http://localhost:3000/api/almacen/${almacenId}`;
    return this.http.put(url, updatedAlmacenData);
  }

  delAlmacen(almacenId: string, state: boolean): Observable<any> {
    const url = `http://localhost:3000/api/almacen/${almacenId}/delAlmacen`;
    return this.http.put(url, { state });
  }

  postOCR(texto: string): Observable<any> {
    let url = "http://localhost:3000/api/motorDeInferencia";
    return this.http.post<any>(url, {texto});
    
  }


}
