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

  postOCRFacturas(facturaOCR: OCRFactura): Observable<any> {
    console.log(facturaOCR);
    let url = "http://localhost:3000/api/motorDeInferencia";
    return this.http.post<any>(url, facturaOCR);
  }
  postOCRCertificadEmpresa(empresaOCR: OCRCertificadoEmpresa): Observable<any> {
    console.log(empresaOCR);
    let url = "http://localhost:3000/api/motorDeInferencia/empresa";
    return this.http.post<any>(url, empresaOCR);
  }
}