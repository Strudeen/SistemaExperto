import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; // Importa MatDialog
import { Authentication } from 'src/app/models/authentication';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertasAlmacenComponent } from '../../alertas/alertasAlmacen/alertas-almacen/alertas-almacen.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  error:string = '';
  submitted:boolean = false;
  emailControl = new FormControl('jhuayhuah@aben.gob.bo', [Validators.required, Validators.email]);
  passwordControl = new FormControl('123456aben', [Validators.required]);
  loginForm = new FormGroup({
      email: this.emailControl,
      password: this.passwordControl,
  });

  constructor(private authService: AuthenticationService, 
              private router: Router,
              private dialog: MatDialog) { // Inyecta MatDialog
  }
  
  ngOnInit() {
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;
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
                  this.mostrarAlerta(); // Llama a la función para mostrar la alerta
                  this.router.navigate(['/']);
              },
              error: (error) => {
                  this.error = error ? error : '';
                  console.log(error);
              }
          })
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



  // onLogin() {
  //     const body = {
  //         email: this.username,
  //         password: this.password
  //     };

  //     const response = this.http.post('/api/signIn', body);

  //     response.subscribe((data) => {

  //         const token = data;
  //         const decodedToken = jwtDecode("");
  //         Aquí es donde puedes hacer algo con el token, como guardarlo en el almacenamiento local o en el servidor
  //     }, (error) => {
  //         console.error(error);
  //     });
  // }
}