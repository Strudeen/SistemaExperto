import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; // Importa MatDialog
import { Authentication } from 'src/app/models/authentication';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertasAlmacenComponent } from '../../alertas/alertasAlmacen/alertas-almacen/alertas-almacen.component';
import { AlertasInventarioComponent } from '../../alertas/alertasInventario/alertas-inventario/alertas-inventario.component';
import {jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  error: string = '';
  submitted: boolean = false;
  emailControl = new FormControl('jhuayhuah@aben.gob.bo', [Validators.required, Validators.email]);
  passwordControl = new FormControl('Hola123!', [Validators.required]);
  loginForm = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl,
  });

  constructor(private authService: AuthenticationService,
              private router: Router,
              private dialog: MatDialog) { // Inyecta MatDialog
  }

  ngOnInit() {}

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.error = ''; // Reset error message
    if (this.loginForm.invalid) {
      return;
    } else {
      const user: Authentication = {
        email: this.emailControl.value as string,
        password: this.passwordControl.value as string,
      }
      this.authService.signIn(user).subscribe({
        next: (resp) => {
          const { token } = resp;
          localStorage.setItem('token', token);
          const decoded: any = jwtDecode(token);
          console.log('TOKEN', decoded);
          if (decoded.user.rol === 'Farmaceutica')
            this.mostrarAlerta2();
          if (decoded.user.rol === 'Almacenista')
            this.mostrarAlerta();
          if (decoded.user.rol === 'Administrador') {
            this.mostrarAlerta2();
            this.mostrarAlerta();
          }

          this.router.navigate(['/institucion']);
        },
        error: (error) => {
          this.error = error; // Set the error message
          console.log(error);
        }
      });
    }
  }

  mostrarAlerta() {
    const dialogRef = this.dialog.open(AlertasAlmacenComponent, {
      width: '400px', // Especifica el ancho deseado
      // Puedes agregar más opciones según tus necesidades
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialogo cerrado');
    });
  }

  mostrarAlerta2() {
    const dialogRef = this.dialog.open(AlertasInventarioComponent, {
      width: '400px', // Especifica el ancho deseado
      // Puedes agregar más opciones según tus necesidades
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialogo cerrado');
    });
  }
}
