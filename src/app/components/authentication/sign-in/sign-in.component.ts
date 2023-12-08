import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Authentication } from 'src/app/models/authentication';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  error:string = '';
  submitted:boolean = false;
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required]);
  loginForm = new FormGroup({
      email: this.emailControl,
      password: this.passwordControl,
  });

  constructor(private authService: AuthenticationService, private router:Router) {
      
   }
  
  ngOnInit() {
  }
  get f() { return this.loginForm.controls; }
  onSubmit() {
      this.submitted = true;
      //validamos que el usuario ingrese datos
      if (this.loginForm.invalid) {
          return;
      } else {
          //creamos el body
          const user: Authentication = {
              email: this.emailControl.value as string,
              password: this.passwordControl.value as string,
          }
          this.authService.signIn(user).subscribe({
              next: (resp) => {
                  const {token} = resp;
                  localStorage.setItem('token', token)
                  this.router.navigate(['/'])
              },
              error: (error) => {
                  this.error = error ? error : '';
                  console.log(error);
              }
          })
      }
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