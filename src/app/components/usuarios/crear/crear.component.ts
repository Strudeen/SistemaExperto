import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    this.createForm();
  }

  ngOnInit() {
    this.rolesService.getRoles().subscribe(roles => {
      this.roles = roles;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentId'] && changes['currentId'].currentValue !== changes['currentId'].previousValue) {
      if (this.currentId !== '') {
        this.loadUsuarioData();
      } else {
        this.createForm();  // Reset form if no user is being edited
      }
    }
  }

  private createForm() {
    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      ci: ['', Validators.required],
      rol: ['', Validators.required],
      sexo: ['', Validators.required],
      password: this.currentId ? [''] : ['', [Validators.required, passwordValidator()]]
    });
  }

  private loadUsuarioData() {
    this.usuarioService.getUsuario(this.currentId).subscribe((usuario) => {
      if (usuario) {
        this.userForm.patchValue({
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          email: usuario.email,
          password: '',  // Leave password empty
          rol: usuario.rol,
          sexo: usuario.sexo,
          ci: usuario.ci,
        });

        // Remove password requirement if editing
        this.userForm.get('password')?.clearValidators();
        this.userForm.get('password')?.updateValueAndValidity();
      }
    });
  }

  saveData() {
    if (this.userForm.invalid) {
      return;
    }

    const formData = this.userForm.value;

    if (this.currentId) {
      // Update existing user
      this.usuarioService.putUsuario(this.currentId, formData).subscribe((resp) => {
        if (resp) {
          console.log(resp.msg);
          this.currentId = '';
          this.userForm.reset();
          this.usuarioService.updateTableData();
        }
      });
    } else {
      // Create new user
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
