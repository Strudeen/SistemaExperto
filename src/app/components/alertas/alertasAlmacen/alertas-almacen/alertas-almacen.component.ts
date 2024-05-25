import { Component, OnInit } from '@angular/core';
import { AlmacenDatos } from 'src/app/models/almacen';
import { AlertaCaducidadService } from 'src/app/services/alertasAlmacen/alerta-caducidad.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-alertas-almacen',
  templateUrl: './alertas-almacen.component.html',
  styleUrls: ['./alertas-almacen.component.css']
})
export class AlertasAlmacenComponent  implements OnInit {
  medicamentos: AlmacenDatos[] = [];

  constructor(
    private alertaCaducidadService: AlertaCaducidadService) {}

  ngOnInit(): void {
    this.alertaCaducidadService.getAlertasAlmacen ().subscribe((data) => {
      this.medicamentos = data;
      console.log(data);
    });
  }

 
}