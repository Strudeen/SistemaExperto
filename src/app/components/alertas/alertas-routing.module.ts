import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertasAlmacenComponent } from './alertasAlmacen/alertas-almacen/alertas-almacen.component';

const routes: Routes = [
  { path: '', component: AlertasAlmacenComponent }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertasRoutingModule { }
