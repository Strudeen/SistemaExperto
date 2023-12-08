import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const token = localStorage.getItem('token')
  if(token == undefined){
    inject(Router).navigate(['/authentication/signIn'])
  }
  return true;
};