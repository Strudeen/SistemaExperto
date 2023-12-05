import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CrearLaboratorio, Laboratorio } from 'src/app/models/laboratorio';


@Injectable({
  providedIn: 'root'
})
export class LaboratorioService {

  private subject$: BehaviorSubject<Laboratorio[]> = new BehaviorSubject<Laboratorio[]>([]);
  public readonly data$: Observable<Laboratorio[]> = this.subject$.asObservable();
  constructor(private http: HttpClient) { }

  public updateTableData() {
    this.getLaboratorios().subscribe((data) => {
      this.subject$.next(data);
    });
  }

  getLaboratorios(): Observable<Laboratorio[]> {
    let url = "http://localhost:3000/api/laboratorio";
    return this.http.get<Laboratorio[]>(url);
  }

  postLaboratorio(crearLaboratorio: CrearLaboratorio): Observable<any> {

    let url = "http://localhost:3000/api/laboratorio";

    return this.http.post<any>(url, crearLaboratorio);
  }
  
  getLaboratorio(laboratorioId: string): Observable<Laboratorio> {
    const url = `http://localhost:3000/api/laboratorio/${laboratorioId}`;
    return this.http.get<Laboratorio>(url);
  }

  putLaboratorio(laboratorioId: string, updatedLaboratorioData: CrearLaboratorio): Observable<any> {
    const url = `http://localhost:3000/api/laboratorio/${laboratorioId}`;
    return this.http.put(url, updatedLaboratorioData); 
  }
  delLaboratorio(laboratorioId: string, state:boolean): Observable<any> {
    const url = `http://localhost:3000/api/laboratorio/${laboratorioId}/delLaboratorio`;
    return this.http.put(url, {state}); 
  }
}
