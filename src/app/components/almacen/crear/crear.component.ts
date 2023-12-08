import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CrearAlmacen } from 'src/app/models/almacen';
import { Medicamento } from 'src/app/models/medicamento';
import { AlmacenService } from 'src/app/services/almacenes/almacen.service';
import { MedicamentoService } from 'src/app/services/medicamentos/medicamento.service';



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
export class CrearComponent implements OnChanges, OnInit {
  @Input() currentId = '';

  medicamentos: Medicamento[];
  public data: CrearAlmacen = {
    codigoMedicamento: '',
    cantidad: 0
  };

  constructor(
    private medicamentoService: MedicamentoService,
    private almacenService: AlmacenService,

  ) { }
  ngOnInit() {
    this.medicamentoService.getMedicamentos().subscribe(medicamentos => {
      this.medicamentos = medicamentos;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // Si el valor del currentId cambia, entonces listar con el id
    console.log(this.currentId);
    if (changes['currentId'].currentValue !== changes['currentId'].previousValue
      && this.currentId !== '') {
      this.almacenService.getAlmacen(this.currentId).subscribe((almacen) => {
        console.log(almacen);
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