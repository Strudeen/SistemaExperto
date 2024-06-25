import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CrearInstitucion, Institucion } from 'src/app/models/institucion';

@Injectable({
  providedIn: 'root'
})
export class InstitucionService {

  private subject$: BehaviorSubject<Institucion[]> = new BehaviorSubject<Institucion[]>([]);
  public readonly data$: Observable<Institucion[]> = this.subject$.asObservable();
  constructor(private http: HttpClient) { }

  // public updateTableData() {
  //   this.getLaboratorios().subscribe((data) => {
  //     this.subject$.next(data);
  //   });
  // }

  getInstitucion(): Observable<Institucion[]> {
    let url = "http://localhost:3000/api/institucion";
    return this.http.get<Institucion[]>(url);
  }
  putInstitucion(institucionId: string, updatedInstitucionData: CrearInstitucion): Observable<any> {
    const url = `http://localhost:3000/api/institucion/${institucionId}`;
    return this.http.put(url, updatedInstitucionData); 
  }
  getInst(institucionId: string): Observable<Institucion> {
    const url = `http://localhost:3000/api/institucion/${institucionId}`;
    return this.http.get<Institucion>(url);
  }

}
