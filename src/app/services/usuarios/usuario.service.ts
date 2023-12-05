import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CrearUsuario, Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private subject$: BehaviorSubject<Usuario[]> = new BehaviorSubject<Usuario[]>([]);
  public readonly data$: Observable<Usuario[]> = this.subject$.asObservable();
  constructor(private http: HttpClient) { }


  public updateTableData() {
    this.getUsuarios().subscribe((data) => {
      this.subject$.next(data);
    });
  }

  getUsuarios(): Observable<Usuario[]> {
    let url = "http://localhost:3000/api/usuario";
    return this.http.get<Usuario[]>(url);
  }
  postUsuario(CrearUsuario: CrearUsuario): Observable<any> {

    let url = "http://localhost:3000/api/usuario";

    return this.http.post<any>(url, CrearUsuario);
  }
  
  getUsuario(usuarioId: string): Observable<Usuario> {
    const url = `http://localhost:3000/api/usuario/${usuarioId}`;
    return this.http.get<Usuario>(url);
  }

  putUsuario(usuarioId: string, updatedUsuarioData: CrearUsuario): Observable<any> {
    const url = `http://localhost:3000/api/usuario/${usuarioId}`;
    return this.http.put(url, updatedUsuarioData); 
  }

  delUsuario(usuarioId: string, state:boolean): Observable<any> {
    const url = `http://localhost:3000/api/usuario/${usuarioId}/delUsuario`;
    return this.http.put(url, {state}); 
  }
}
