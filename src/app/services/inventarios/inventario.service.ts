import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CrearInventario, Inventario } from 'src/app/models/inventario';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private subject$: BehaviorSubject<Inventario[]> = new BehaviorSubject<Inventario[]>([]);
  public readonly data$: Observable<Inventario[]> = this.subject$.asObservable();
  constructor(private http: HttpClient) { }

  public updateTableData() {
    this.getInventarios().subscribe((data) => {
      this.subject$.next(data);
    });
  }

  getInventarios(): Observable<Inventario[]> {
    let url = "http://localhost:3000/api/inventario";
    return this.http.get<Inventario[]>(url);
  }

  postInventario(crearInventario: CrearInventario): Observable<any> {

    let url = "http://localhost:3000/api/inventario";
    return this.http.post<any>(url, crearInventario);
  }

  getInventario(inventarioId: string): Observable<Inventario> {
    const url = `http://localhost:3000/api/inventario/${inventarioId}`;
    return this.http.get<Inventario>(url);
  }

  putInventario(inventarioId: string, updatedInventarioData: CrearInventario): Observable<any> {
    const url = `http://localhost:3000/api/inventario/${inventarioId}`;
    return this.http.put(url, updatedInventarioData);
  }

  delInventario(inventarioId: string, state: boolean): Observable<any> {
    const url = `http://localhost:3000/api/Inventario/${inventarioId}/delInventario`;
    return this.http.put(url, { state });
  }
}
