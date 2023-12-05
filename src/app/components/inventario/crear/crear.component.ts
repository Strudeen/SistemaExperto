import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MedicamentoService } from 'src/app/services/medicamentos/medicamento.service';
import { CrearInventario } from 'src/app/models/inventario';
import { InventarioService } from 'src/app/services/inventarios/inventario.service';

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


  public data: CrearInventario = {
    codigoMedicamento: '',
    cantidad: 0
  };

  constructor(
    private inventarioService: InventarioService,

  ) { }



  ngOnChanges(changes: SimpleChanges) {
    // Si el valor del currentId cambia, entonces listar con el id
    console.log(this.currentId);
    if (changes['currentId'].currentValue !== changes['currentId'].previousValue
      && this.currentId !== '') {
      this.inventarioService.getInventario(this.currentId).subscribe((inventario) => {
        if (inventario) {
          this.data.codigoMedicamento = inventario.codigoMedicamento;
          this.data.cantidad = inventario.cantidad;
        }
      })
    }
  }


  saveData() {
    if (this.currentId) {
      this.inventarioService.putInventario(this.currentId, this.data).subscribe((resp) => {
        if (resp) {
          console.log(resp.msg);
          this.currentId = '';
          this.data = {
            codigoMedicamento: '',
            cantidad: 0
          };
          this.inventarioService.updateTableData();
        }
      })
    }
    else {
      this.inventarioService.postInventario(this.data).subscribe((resp) => {
        if (resp) {
          console.log(resp.msg);
          this.currentId = '';
          this.data = {
            codigoMedicamento: '',
            cantidad: 0
          };
          this.inventarioService.updateTableData();
        }
      })
    }
  }
}
