import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrearUsuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import { RolService } from 'src/app/services/roles/rol.service';
import { passwordValidator } from 'src/app/validators/password-validator';

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
    { value: 'Femenino', viewValue: 'Femenino' },
  ];

  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rolesService: RolService,
    private usuarioService: UsuarioService,
  ) { 
    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      ci: ['', Validators.required],
      rol: ['', Validators.required],
      sexo: ['', Validators.required],
      password: ['', [Validators.required, passwordValidator()]]
    });
  }

  ngOnInit() {
    this.rolesService.getRoles().subscribe(roles => {
      this.roles = roles;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentId'] && changes['currentId'].currentValue !== changes['currentId'].previousValue
      && this.currentId !== '') {
      this.usuarioService.getUsuario(this.currentId).subscribe((usuario) => {
        if (usuario) {
          this.userForm.patchValue({
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            password: '',
            rol: usuario.rol,
            sexo: usuario.sexo,
            ci: usuario.ci,
          });
        }
      });
    }
  }

  saveData() {
    if (this.userForm.invalid) {
      return;
    }

    const formData = this.userForm.value;

    if (this.currentId) {
      this.usuarioService.putUsuario(this.currentId, formData).subscribe((resp) => {
        if (resp) {
          console.log(resp.msg);
          this.currentId = '';
          this.userForm.reset();
          this.usuarioService.updateTableData();
        }
      });
    } else {
      this.usuarioService.postUsuario(formData).subscribe((resp) => {
        if (resp) {
          console.log(resp.msg);
          this.currentId = '';
          this.userForm.reset();
          this.usuarioService.updateTableData();
        }
      });
    }
  }
}
