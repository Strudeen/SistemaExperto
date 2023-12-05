import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarComponent } from './listar/listar.component';
import { ListarDatosComponent } from './listarDatos/listar-datos.component';


const routes: Routes = [
  { path: '', component: ListarComponent },
  { path: 'datos/:id', component: ListarDatosComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventariosRoutingModule { }
