import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CrearUsuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import { RolService } from 'src/app/services/roles/rol.service';




interface Sexo {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnChanges, OnInit {
  @Input() currentId = '';

  roles: any[];

  sexos: Sexo[] = [
    { value: 'Masculino', viewValue: 'Masculino' },
    { value: 'Femenino' , viewValue: 'Femenino' },

  ];


  public data: CrearUsuario = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    rol: '',
    sexo: '',
    ci: '',

  };
  constructor(
    private rolesService: RolService,
    private usuarioService: UsuarioService,

  ) { }
  
  ngOnInit() {
    this.rolesService.getRoles().subscribe(roles => {
      this.roles = roles;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // Si el valor del currentId cambia, entonces listar con el id
    console.log(this.currentId);
    if (changes['currentId'].currentValue !== changes['currentId'].previousValue
      && this.currentId !== '') {
      this.usuarioService.getUsuario(this.currentId).subscribe((usuario) => {
        if (usuario) {
          this.data.nombre = usuario.nombre;
          this.data.apellido = usuario.apellido;
          this.data.email = usuario.email;
          this.data.password = usuario.password;
          this.data.rol = usuario.rol;
          this.data.sexo = usuario.sexo;
          this.data.ci = usuario.ci;
        }
      })
    }
  }


  saveData() {
    if (this.currentId) {
      this.usuarioService.putUsuario(this.currentId, this.data).subscribe((resp) => {
        if (resp) {
          console.log(resp.msg);
          this.currentId = '';
          this.data = {
            nombre: '',
            apellido: '',
            email: '',
            password: '',
            rol: '',
            sexo: '',
            ci: '',
          };
          this.usuarioService.updateTableData();
        }
      })
    }
    else {
      this.usuarioService.postUsuario(this.data).subscribe((resp) => {
        if (resp) {
          console.log(resp.msg);
          this.currentId = '';
          this.data = {
            nombre: '',
            apellido: '',
            email: '',
            password: '',
            rol: '',
            sexo: '',
            ci: '',
          };
          this.usuarioService.updateTableData();
        }
      })
    }
  }
}
