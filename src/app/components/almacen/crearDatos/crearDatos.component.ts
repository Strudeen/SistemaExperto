import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CrearAlmacenDatos } from 'src/app/models/almacen';
import { AlmacenDatosService } from 'src/app/services/almacenes/almacen-datos.service';
import { DatePipe } from '@angular/common'
import { Laboratorio } from 'src/app/models/laboratorio';
import { LaboratorioService } from 'src/app/services/laboratorios/laboratorio.service';

interface Tipo {
  value: string;
  viewValue: string;
}

interface Exclusividad {
  value: boolean;
  viewValue: string;
}


@Component({
  selector: 'app-crearDatos',
  templateUrl: './crearDatos.component.html',
  styleUrls: ['./crearDatos.component.css']
})



export class CrearDatosComponent implements OnChanges, OnInit {
  @Input() currentId = '';

  @Input() almacenId = '';

  laboratorios: Laboratorio[];
  public data: CrearAlmacenDatos = {
    fechaCaducidad: '',
    cantidad: '0',
    codigoLaboratorio: '',
    nroLote: ''
  };

  constructor(
    private laboratorioServices: LaboratorioService,
    private almacenDatosService: AlmacenDatosService,

  ) { 
  }
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
      this.almacenDatosService.getAlmacen(this.currentId).subscribe((almacen) => {
        if (almacen) {
          console.log(almacen);
          this.data.fechaCaducidad = this.formatDate(almacen.fechaCaducidad);
          this.data.cantidad = '' + almacen.cantidad
          this.data.codigoLaboratorio = almacen.codigoLaboratorio
          this.data.nroLote = almacen.nroLote
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
      this.almacenDatosService.putAlmacen(this.currentId, this.data).subscribe((resp) => {
        if (resp) {
          console.log(resp.msg);
          this.currentId = '';
          this.data = {
            fechaCaducidad: '',
            cantidad: '0',
            codigoLaboratorio: '',
            nroLote: ''
          };
          this.almacenDatosService.updateTableData(this.almacenId);
        }
      })
    }
    else {
      this.almacenDatosService.postAlmacen(this.data,this.almacenId).subscribe((resp) => {
        if (resp) {
          console.log(resp.msg);
          this.currentId = '';
          this.data = {
            fechaCaducidad: '',
            cantidad: '0',
            codigoLaboratorio: '',
            nroLote: ''
          };
          this.almacenDatosService.updateTableData(this.almacenId);
        }
      })
    }
  }
}
