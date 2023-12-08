import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CrearPedido, Pedido } from 'src/app/models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidosService  {
  private subject$: BehaviorSubject<Pedido[]> = new BehaviorSubject<Pedido[]>([]);
  public readonly data$: Observable<Pedido[]> = this.subject$.asObservable();
  constructor(private http: HttpClient) { }


  public updateTableData() {
    this.getPedidos().subscribe((data) => {
      this.subject$.next(data);
    });
  }

  getPedidos(): Observable<Pedido[]> {
    let url = "http://localhost:3000/api/pedidosAlmacen/";
    return this.http.get<Pedido[]>(url);
  }

  postPedido(CrearPedido: CrearPedido): Observable<any> {

    let url = "http://localhost:3000/api/pedidosInventario/crearPedido/";

    return this.http.post<any>(url, CrearPedido);
  }
  
  getPedido(pedidoId: string): Observable<Pedido> {
    const url = `http://localhost:3000/api/pedidosInventario/obtenerPedido/${pedidoId}`;
    return this.http.get<Pedido>(url);
  }

  delPedido(pedidoId: string): Observable<any> {
    const url = `http://localhost:3000/api/pedidosInventario/cancelarPedido/${pedidoId}`;
    return this.http.put(url, {}); // Asegúrate de enviar un cuerpo vacío si el backend lo requiere
}
actualizarPedido(pedidoId: string, nuevoEstado: string): Observable<any> {
  const url = `http://localhost:3000/api/pedidosAlmacen/${pedidoId}`;
  return this.http.put(url, { nuevoEstado }); 
}
}