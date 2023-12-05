import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlmacenDatos, AlmacenEntity, CrearAlmacenDatos } from 'src/app/models/almacen';

@Injectable({
  providedIn: 'root'
})
export class AlmacenDatosService {
  private almacenEntity: AlmacenEntity = {
    _id: "",
    codigoMedicamento: "",
    cantidad: 0,
    state: true,
    datos: [],
    createdAt: "",
    updatedAt: "",
  }
  private subject$: BehaviorSubject<AlmacenEntity> = new BehaviorSubject<AlmacenEntity>(this.almacenEntity);
  public readonly data$: Observable<AlmacenEntity> = this.subject$.asObservable();
  constructor(private http: HttpClient) { }

  public updateTableData(id:string) {
    console.log(id)
    this.getAlmacenes(id).subscribe((data) => {
      this.subject$.next(data);
    });
  }

  getAlmacenes(id:string): Observable<AlmacenEntity> {
    let url = "http://localhost:3000/api/almacenMedicamento/"+id;
    console.log(id);
    return this.http.get<AlmacenEntity>(url);
  }

  postAlmacen(crearAlmacen: CrearAlmacenDatos,id:string): Observable<any> {
    let url = "http://localhost:3000/api/almacenMedicamento/"+id;
    return this.http.post<any>(url, crearAlmacen);
  }

  getAlmacen(almacenId: string): Observable<AlmacenDatos> {
    const url = `http://localhost:3000/api/almacenMedicamento/edit/${almacenId}`;
    return this.http.get<AlmacenDatos>(url);
  }

  putAlmacen(almacenId: string, updatedAlmacenData: CrearAlmacenDatos): Observable<any> {
    const url = `http://localhost:3000/api/almacenMedicamento/${almacenId}`;
    return this.http.put(url, updatedAlmacenData);
  }

  delAlmacen(almacenId: string, state: boolean): Observable<any> {
    const url = `http://localhost:3000/api/almacenMedicamento/${almacenId}/delAlmacen`;
    return this.http.put(url, { state });
  }
}