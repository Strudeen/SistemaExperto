import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstitucionComponent } from './institucion/institucion.component';
import { InstitucionEditarComponent } from './institucionEditar/institucion-editar/institucion-editar.component';

const routes: Routes = [
  { path: 'institucion', component: InstitucionComponent },
  { path: 'institucion-editar/:id', component: InstitucionEditarComponent },
  { path: '**', redirectTo: 'institucion' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstitucionRoutingModule { }
