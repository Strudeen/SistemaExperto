import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CrearLaboratorio } from 'src/app/models/laboratorio';
import { LaboratorioService } from 'src/app/services/laboratorios/laboratorio.service';


@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnChanges {
  @Input() currentId = '';


  public data: CrearLaboratorio = {
    codigo: '',
    nombre: '',
    nit: '',
    telefono: '',
    celular: '',
    email: '',
    direccion: '',
  };
  
  constructor(
    private laboratorioService: LaboratorioService,
  
  ) { }


  ngOnChanges(changes: SimpleChanges) {
    // Si el valor del currentId cambia, entonces listar con el id
    console.log(this.currentId);
    if (changes['currentId'].currentValue !== changes['currentId'].previousValue
      && this.currentId !== '') {
      this.laboratorioService.getLaboratorio(this.currentId).subscribe((laboratorio) => {
        if (laboratorio) {
          this.data.codigo = laboratorio.codigo;
          this.data.nombre = laboratorio.nombre;
          this.data.nit = laboratorio.nit;
          this.data.telefono = laboratorio.telefono;
          this.data.celular = laboratorio.celular;
          this.data.email = laboratorio.email;
          this.data.direccion = laboratorio.direccion;
        }
      })
    }
  }
  

  saveData() {
    if (this.currentId) {
      this.laboratorioService.putLaboratorio(this.currentId, this.data).subscribe((resp) => {
        if (resp) {
          console.log(resp.msg);
          this.currentId = '';
          this.data = {
            codigo: '',
            nombre: '',
            nit: '',
            telefono: '',
            celular: '',
            email: '',
            direccion: '',
          };
          this.laboratorioService.updateTableData();
        }
      })
    }
    else {
      this.laboratorioService.postLaboratorio(this.data).subscribe((resp) => {
        if (resp) {
          console.log(resp.msg);
          this.currentId = '';
          this.data = {
            codigo: '',
            nombre: '',
            nit: '',
            telefono: '',
            celular: '',
            email: '',
            direccion: '',
          };
          this.laboratorioService.updateTableData();
        }
      })
    }
  }


}




