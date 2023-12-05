import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { ArchivosComponent } from './components/archivos/archivos.component';

const routes: Routes = [
  //Redireccionar en caso de no existir
  //{ path: '', loadChildren: ()=> import('./components/items/items-routing.module').then( i => i.ItemsRoutingModule )},
  {path:'', component:MenuComponent, children:[
    {path: 'archivos', component:ArchivosComponent},
    {path: 'medicamentos', loadChildren: () => import('./components/medicamentos/medicamentos-routing.module').then(m => m.MedicamentosRoutingModule)},
    {path: 'laboratorios', loadChildren: () => import('./components/laboratorios/laboratorios-routing.module').then(m => m.LaboratoriosRoutingModule)},
    {path: 'pacientes', loadChildren: () => import('./components/pacientes/pacientes-routing.module').then(m => m.PacientesRoutingModule)},
    {path: 'roles', loadChildren: () => import('./components/roles/roles-routing.module').then(m => m.RolesRoutingModule)},
    {path: 'usuarios', loadChildren: () => import('./components/usuarios/usuarios-routing.module').then(m => m.UsuariosRoutingModule)},
    {path: 'inventario', loadChildren: () => import('./components/inventario/inventario-routing.module').then(m => m.InventariosRoutingModule)},
    {path: 'almacen', loadChildren: () => import('./components/almacen/almacen-routing.module').then(m => m.AlmacenRoutingModule)},

  ]},
  

  { path: '**', redirectTo: '', pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
