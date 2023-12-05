import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CrearPaciente, Paciente } from 'src/app/models/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {


  private subject$: BehaviorSubject<Paciente[]> = new BehaviorSubject<Paciente[]>([]);
  public readonly data$: Observable<Paciente[]> = this.subject$.asObservable();
  constructor(private http: HttpClient) { }


  public updateTableData() {
    this.getPacientes().subscribe((data) => {
      this.subject$.next(data);
    });
  }

  getPacientes(): Observable<Paciente[]> {
    let url = "http://localhost:3000/api/paciente";
    return this.http.get<Paciente[]>(url);
  }

  postPaciente(CrearPaciente: CrearPaciente): Observable<any> {

    let url = "http://localhost:3000/api/paciente";

    return this.http.post<any>(url, CrearPaciente);
  }
  
  getPaciente(pacienteId: string): Observable<Paciente> {
    const url = `http://localhost:3000/api/paciente/${pacienteId}`;
    return this.http.get<Paciente>(url);
  }

  putPaciente(pacienteId: string, updatedPacienteData: CrearPaciente): Observable<any> {
    const url = `http://localhost:3000/api/paciente/${pacienteId}`;
    return this.http.put(url, updatedPacienteData); 
  }
  delPaciente(pacienteId: string, state:boolean): Observable<any> {
    const url = `http://localhost:3000/api/paciente/${pacienteId}/delPaciente`;
    return this.http.put(url, {state}); 
  }

}
