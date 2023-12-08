import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MedicamentoService } from 'src/app/services/medicamentos/medicamento.service';
import { CrearInventario, CrearInventarioDatos } from 'src/app/models/inventario';
import { InventarioDatosService } from 'src/app/services/inventarios/inventario-datos.service';
import { LaboratorioService } from 'src/app/services/laboratorios/laboratorio.service';
import { Laboratorio } from 'src/app/models/laboratorio';

interface Tipo {
  value: string;
  viewValue: string;
}

interface Exclusividad {
  value: boolean;
  viewValue: string;
}


@Component({
  selector: 'app-crear-datos',
  templateUrl: './crear-datos.component.html',
  styleUrls: ['./crear-datos.component.css'],
})
export class CrearDatosComponent implements OnChanges, OnInit {
  @Input() currentId = '';

  @Input() inventarioId = '';

  laboratorios: Laboratorio[];
  public data: CrearInventarioDatos = {
    fechaCaducidad: '',
    cantidad: '0',
    codigoLaboratorio: '',
    nroLote: ''
  };

  constructor(
    private laboratorioServices: LaboratorioService,
    private inventarioDatosService: InventarioDatosService,

  ) { }
  ngOnInit() {
    this.laboratorioServices.getLaboratorios().subscribe(laboratorios => {
      this.laboratorios = laboratorios;
    });
  }


  ngOnChanges(changes: SimpleChanges) {
    // Si el valor del currentId cambia, entonces listar con el id
    console.log(this.currentId);
    if (changes['currentId'].currentValue !== changes['currentId'].previousValue
      && this.currentId !== '') {
      this.inventarioDatosService.getInventario(this.currentId).subscribe((inventario) => {
        if (inventario) {
          this.data.fechaCaducidad = this.formatDate(inventario.fechaCaducidad);
          this.data.cantidad = '' + inventario.cantidad
          this.data.codigoLaboratorio = inventario.codigoLaboratorio
          this.data.nroLote = inventario.nroLote
        }
      })
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
    const day = ('0' + date.getUTCDate()).slice(-2); 
    return `${year}-${month}-${day}`;
  }
  saveData() {
    if (this.currentId) {
      this.inventarioDatosService.putInventario(this.currentId, this.data).subscribe((resp) => {
        if (resp) {
          console.log(resp.msg);
          this.currentId = '';
          this.data = {
            fechaCaducidad: '',
            cantidad: '0',
            codigoLaboratorio: '',
            nroLote: ''
          };
          this.inventarioDatosService.updateTableData(this.inventarioId);
        }
      })
    }
    else {
      this.inventarioDatosService.postInventario(this.data,this.inventarioId).subscribe((resp) => {
        if (resp) {
          console.log(resp.msg);
          this.currentId = '';
          this.data = {
            fechaCaducidad: '',
            cantidad: '0',
            codigoLaboratorio: '',
            nroLote: ''
          };
          this.inventarioDatosService.updateTableData(this.inventarioId);
        }
      })
    }
  }
}
