import { Component, OnInit } from '@angular/core';
import { InventarioDatos } from 'src/app/models/inventario';
import { AlertaCaducidadService } from 'src/app/services/alertasInventario/alerta-caducidad.service';

@Component({
  selector: 'app-alertas-inventario',
  templateUrl: './alertas-inventario.component.html',
  styleUrls: ['./alertas-inventario.component.css']
})
export class AlertasInventarioComponent implements OnInit {
  medicamentos: InventarioDatos[] = [];

  constructor(
    private alertaCaducidadService: AlertaCaducidadService) {}

  ngOnInit(): void {
    this.alertaCaducidadService.getAlertasInventario ().subscribe((data) => {
      this.medicamentos = data;
      console.log(data);
    });
  }
}
