import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CrearRol, Rol } from 'src/app/models/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  
  private subject$: BehaviorSubject<Rol[]> = new BehaviorSubject<Rol[]>([]);
  public readonly data$: Observable<Rol[]> = this.subject$.asObservable();
  constructor(private http: HttpClient) { }


  public updateTableData() {
    this.getRoles().subscribe((data) => {
      this.subject$.next(data);
    });
  }

  getRoles(): Observable<Rol[]> {
    let url = "http://localhost:3000/api/rol";
    return this.http.get<Rol[]>(url);
  }
  postRol(CrearRol: CrearRol): Observable<any> {

    let url = "http://localhost:3000/api/rol";

    return this.http.post<any>(url, CrearRol);
  }
  
  getRol(rolId: string): Observable<Rol> {
    const url = `http://localhost:3000/api/rol/${rolId}`;
    return this.http.get<Rol>(url);
  }

  putRol(rolId: string, updatedRolData: CrearRol): Observable<any> {
    const url = `http://localhost:3000/api/rol/${rolId}`;
    return this.http.put(url, updatedRolData); 
  }

  delRol(rolId: string, state:boolean): Observable<any> {
    const url = `http://localhost:3000/api/rol/${rolId}/delRol`;
    return this.http.put(url, {state}); 
  }

}
