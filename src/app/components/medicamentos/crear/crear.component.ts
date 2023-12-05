import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CrearMedicamento } from 'src/app/models/medicamento';
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
  styleUrls: ['./crear.component.css'],
})
export class CrearComponent implements OnChanges {
  @Input() currentId = '';

  tipos: Tipo[] = [
    { value: 'ampolla', viewValue: 'Ampolla' },
    { value: 'comprimido', viewValue: 'Comprimido' },
    { value: 'frasco', viewValue: 'Frasco' },
    { value: 'tubo', viewValue: 'Tubo' },
  ];

  exclusividades: Exclusividad[] = [
    { value: true, viewValue: 'Si' },
    { value: false, viewValue: 'No' },

  ];


  public data: CrearMedicamento = {
    codigo: '',
    nombre: '',
    descripcion: '',
    tipo: '',
    exclusividad: false,
  };

  constructor(
    private medicamentoService: MedicamentoService,

  ) { }



  ngOnChanges(changes: SimpleChanges) {
    // Si el valor del currentId cambia, entonces listar con el id
    console.log(this.currentId);
    if (changes['currentId'].currentValue !== changes['currentId'].previousValue
      && this.currentId !== '') {
      this.medicamentoService.getMedicamento(this.currentId).subscribe((medicamento) => {
        if (medicamento) {
          this.data.codigo = medicamento.codigo;
          this.data.nombre = medicamento.nombre;
          this.data.descripcion = medicamento.descripcion;
          this.data.tipo = medicamento.tipo;
          this.data.exclusividad = medicamento.exclusividad;
        }
      })
    }
  }


  saveData() {
    if (this.currentId) {
      this.medicamentoService.putMedicamento(this.currentId, this.data).subscribe((resp) => {
        if (resp) {
          console.log(resp.msg);
          this.currentId = '';
          this.data = {
            codigo: '',
            nombre: '',
            descripcion: '',
            tipo: '',
            exclusividad: false,
          };
          this.medicamentoService.updateTableData();
        }
      })
    }
    else {
      this.medicamentoService.postMedicamento(this.data).subscribe((resp) => {
        if (resp) {
          console.log(resp.msg);
          this.currentId = '';
          this.data = {
            codigo: '',
            nombre: '',
            descripcion: '',
            tipo: '',
            exclusividad: false,
          };
          this.medicamentoService.updateTableData();
        }
      })
    }
  }
}
