import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Compra, CompraForm } from 'src/app/models/compras';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private subject$: BehaviorSubject<Compra[]> = new BehaviorSubject<Compra[]>([]);
  public readonly data$: Observable<Compra[]> = this.subject$.asObservable();
  constructor(private http: HttpClient) { }

  public updateTableData() {
    this.getCompras().subscribe((data) => {
      this.subject$.next(data);
    });
  }


  getCompras(): Observable<Compra[]> {
    let url = "http://localhost:3000/api/compras";
    return this.http.get<Compra[]>(url);
  }

  postCompra(crearCompra: CompraForm): Observable<any> {
    let url = "http://localhost:3000/api/compras";
    return this.http.post<any>(url, crearCompra);
  }

  getCompra(compraId: string): Observable<Compra> {
    const url = `http://localhost:3000/api/compras/${compraId}`;
    return this.http.get<Compra>(url);
  }

  delCompra(compraId: string, state: boolean): Observable<any> {
    const url = `http://localhost:3000/api/compras/${compraId}/delCompra`;
    return this.http.put(url, { state });
  }

  onFileSaved(formData:FormData): Observable<any> {
    return this.http.post("http://localhost:3000/api/file/upload", formData);
  }

}
