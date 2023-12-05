import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CrearAlmacenDatos } from 'src/app/models/almacen';
import { AlmacenDatosService } from 'src/app/services/almacenes/almacen-datos.service';


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



export class CrearDatosComponent implements OnChanges {
  @Input() currentId = '';

  @Input() almacenId = '';


  public data: CrearAlmacenDatos = {
    fechaCaducidad: '',
    cantidad: '0',
    codigoLaboratorio: '',
    nroLote: ''
  };

  constructor(
    private almacenDatosService: AlmacenDatosService,

  ) { }



  ngOnChanges(changes: SimpleChanges) {
    // Si el valor del currentId cambia, entonces listar con el id
    console.log(this.currentId);
    if (changes['currentId'].currentValue !== changes['currentId'].previousValue
      && this.currentId !== '') {
      this.almacenDatosService.getAlmacen(this.currentId).subscribe((almacen) => {
        if (almacen) {
          this.data.fechaCaducidad = almacen.fechaCaducidad
          this.data.cantidad = '' + almacen.cantidad
          this.data.codigoLaboratorio = almacen.codigoLaboratorio
          this.data.nroLote = almacen.nroLote
        }
      })
    }
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
