import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CrearInventario, CrearInventarioDatos, Inventario, InventarioDatos, InventarioEntity } from 'src/app/models/inventario';

@Injectable({
  providedIn: 'root'
})
export class InventarioDatosService {
  private inventarioEntity: InventarioEntity = {
    _id: "",
    codigoMedicamento: "",
    cantidad: 0,
    state: true,
    datos: [],
    createdAt: "",
    updatedAt: "",
  }
  private subject$: BehaviorSubject<InventarioEntity> = new BehaviorSubject<InventarioEntity>(this.inventarioEntity);
  public readonly data$: Observable<InventarioEntity> = this.subject$.asObservable();
  constructor(private http: HttpClient) { }

  public updateTableData(id:string) {
    console.log(id)
    this.getInventarios(id).subscribe((data) => {
      this.subject$.next(data);
    });
  }

  getInventarios(id:string): Observable<InventarioEntity> {
    let url = "http://localhost:3000/api/inventarioMedicamento/"+id;
    console.log(id);
    return this.http.get<InventarioEntity>(url);
  }

  postInventario(crearInventario: CrearInventarioDatos,id:string): Observable<any> {
    let url = "http://localhost:3000/api/inventarioMedicamento/"+id;
    return this.http.post<any>(url, crearInventario);
  }

  getInventario(inventarioId: string): Observable<InventarioDatos> {
    const url = `http://localhost:3000/api/inventarioMedicamento/edit/${inventarioId}`;
    return this.http.get<InventarioDatos>(url);
  }

  putInventario(inventarioId: string, updatedInventarioData: CrearInventarioDatos): Observable<any> {
    const url = `http://localhost:3000/api/inventarioMedicamento/${inventarioId}`;
    return this.http.put(url, updatedInventarioData);
  }

  delInventario(inventarioId: string, state: boolean): Observable<any> {
    const url = `http://localhost:3000/api/inventarioMedicamento/${inventarioId}/delInventario`;
    return this.http.put(url, { state });
  }
}
