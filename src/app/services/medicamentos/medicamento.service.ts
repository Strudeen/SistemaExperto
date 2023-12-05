import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CrearMedicamento, Medicamento } from 'src/app/models/medicamento';

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {

  private subject$: BehaviorSubject<Medicamento[]> = new BehaviorSubject<Medicamento[]>([]);
  public readonly data$: Observable<Medicamento[]> = this.subject$.asObservable();
  constructor(private http: HttpClient) { }

  public updateTableData() {
    this.getMedicamentos().subscribe((data) => {
      this.subject$.next(data);
    });
  }

  getMedicamentos(): Observable<Medicamento[]> {
    let url = "http://localhost:3000/api/medicamento";
    return this.http.get<Medicamento[]>(url);
  }

  postMedicamento(crearMedicamento: CrearMedicamento): Observable<any> {

    let url = "http://localhost:3000/api/medicamento";
    return this.http.post<any>(url, crearMedicamento);
  }

  getMedicamento(medicamentoId: string): Observable<Medicamento> {
    const url = `http://localhost:3000/api/medicamento/${medicamentoId}`;
    return this.http.get<Medicamento>(url);
  }

  putMedicamento(medicamentoId: string, updatedMedicamentoData: CrearMedicamento): Observable<any> {
    const url = `http://localhost:3000/api/medicamento/${medicamentoId}`;
    return this.http.put(url, updatedMedicamentoData);
  }

  delMedicamento(medicamentoId: string, state: boolean): Observable<any> {
    const url = `http://localhost:3000/api/medicamento/${medicamentoId}/delMedicamento`;
    return this.http.put(url, { state });
  }
}
