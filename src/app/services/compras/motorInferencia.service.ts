import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlmacenDatos, AlmacenEntity, CrearAlmacenDatos } from 'src/app/models/almacen';
import { OCRCertificadoEmpresa, OCRFactura } from 'src/app/models/ocr';

@Injectable({
  providedIn: 'root'
})
export class MotorInferenciaService {  
  constructor(private http: HttpClient) { }

  postFileValidation(formData: FormData, typeDocument: string): Observable<any> {
    console.log(formData);
    let url = `http://localhost:3000/api/file/upload/${typeDocument}`;
    return this.http.post<any>(url, formData);
  }
  postOCRCertificadEmpresa(empresaOCR: OCRCertificadoEmpresa): Observable<any> {
    console.log(empresaOCR);
    let url = "http://localhost:3000/api/motorDeInferencia/empresa";
    return this.http.post<any>(url, empresaOCR);
  }
}