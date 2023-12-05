import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CrearRol } from 'src/app/models/rol';
import { RolService } from 'src/app/services/roles/rol.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnChanges {
  @Input() currentId = '';


  public data: CrearRol = {
    nombre: '',
    descripcion: '',
  };
  constructor(
    private rolService: RolService,

  ) { }

  ngOnChanges(changes: SimpleChanges) {
    // Si el valor del currentId cambia, entonces listar con el id
    console.log(this.currentId);
    if (changes['currentId'].currentValue !== changes['currentId'].previousValue
      && this.currentId !== '') {
      this.rolService.getRol(this.currentId).subscribe((rol) => {
        if (rol) {
          this.data.nombre = rol.nombre;
          this.data.descripcion = rol.descripcion;
        }
      })
    }
  }
  saveData() {
    if (this.currentId) {
      this.rolService.putRol(this.currentId, this.data).subscribe((resp) => {
        if (resp) {
          console.log(resp.msg);
          this.currentId = '';
          this.data = {
            nombre: '',
            descripcion: '',
          };
          this.rolService.updateTableData();
        }
      })
    }
    else {
      this.rolService.postRol(this.data).subscribe((resp) => {
        if (resp) {
          console.log(resp.msg);
          this.currentId = '';
          this.data = {
            nombre: '',
            descripcion: '',
          };
          this.rolService.updateTableData();
        }
      })
    }
  }


}
