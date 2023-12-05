import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CrearPaciente } from 'src/app/models/paciente';
import { PacienteService } from 'src/app/services/pacientes/paciente.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnChanges  {
  @Input() currentId = '';


  public data: CrearPaciente = {
    nombre: '',
    apellido: '',
    ci: '',
    edad: '',
  };
  constructor(
    private pacienteService: PacienteService,
  
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    // Si el valor del currentId cambia, entonces listar con el id
    console.log(this.currentId);
    if (changes['currentId'].currentValue !== changes['currentId'].previousValue
      && this.currentId !== '') {
      this.pacienteService.getPaciente(this.currentId).subscribe((paciente) => {
        if (paciente) {
          this.data.nombre = paciente.nombre;
          this.data.apellido = paciente.apellido;
          this.data.ci = paciente.ci;
          this.data.edad = paciente.edad;
        }
      })
    }
  }

  saveData() {
    if (this.currentId) {
      this.pacienteService.putPaciente(this.currentId, this.data).subscribe((resp) => {
        if (resp) {
          console.log(resp.msg);
          this.currentId = '';
          this.data = {
            nombre: '',
            apellido: '',
            ci: '',
            edad: '',
          };
          this.pacienteService.updateTableData();
        }
      })
    }
    else {
      this.pacienteService.postPaciente(this.data).subscribe((resp) => {
        if (resp) {
          console.log(resp.msg);
          this.currentId = '';
          this.data = {
            nombre: '',
            apellido: '',
            ci: '',
            edad: '',
          };
          this.pacienteService.updateTableData();
        }
      })
    }
  }
  

}
