import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CrearAlmacen } from 'src/app/models/almacen';
import { AlmacenService } from 'src/app/services/almacenes/almacen.service';



interface Tipo {
  value: string;
  viewValue: string;
}

interface Exclusividad {
  value: boolean;
  viewValue: string;
}


@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnChanges {
  @Input() currentId = '';


  public data: CrearAlmacen = {
    codigoMedicamento: '',
    cantidad: 0
  };

  constructor(
    private almacenService: AlmacenService,

  ) { }

  ngOnChanges(changes: SimpleChanges) {
    // Si el valor del currentId cambia, entonces listar con el id
    console.log(this.currentId);
    if (changes['currentId'].currentValue !== changes['currentId'].previousValue
      && this.currentId !== '') {
      this.almacenService.getAlmacen(this.currentId).subscribe((almacen) => {
        if (almacen) {
          this.data.codigoMedicamento = almacen.codigoMedicamento;
          this.data.cantidad = almacen.cantidad;
        }
      })
    }
  }

  saveData() {
    if (this.currentId) {
      this.almacenService.putAlmacen(this.currentId, this.data).subscribe((resp) => {
        if (resp) {
          console.log(resp.msg);
          this.currentId = '';
          this.data = {
            codigoMedicamento: '',
            cantidad: 0
          };
          this.almacenService.updateTableData();
        }
      })
    }
    else {
      this.almacenService.postAlmacen(this.data).subscribe((resp) => {
        if (resp) {
          console.log(resp.msg);
          this.currentId = '';
          this.data = {
            codigoMedicamento: '',
            cantidad: 0
          };
          this.almacenService.updateTableData();
        }
      })
    }
  }
}