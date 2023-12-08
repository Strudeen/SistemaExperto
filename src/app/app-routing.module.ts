import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { ArchivosComponent } from './components/archivos/archivos.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  //Redireccionar en caso de no existir
  //{ path: '', loadChildren: ()=> import('./components/items/items-routing.module').then( i => i.ItemsRoutingModule )},
  
  {path:'',canActivate: [authGuard], component:MenuComponent, children:[
    {path: 'archivos', component:ArchivosComponent},
    {path: 'medicamentos', canActivate: [authGuard], loadChildren: () => import('./components/medicamentos/medicamentos-routing.module').then(m => m.MedicamentosRoutingModule)},
    {path: 'laboratorios', canActivate: [authGuard], loadChildren: () => import('./components/laboratorios/laboratorios-routing.module').then(m => m.LaboratoriosRoutingModule)},
    {path: 'pacientes',canActivate: [authGuard], loadChildren: () => import('./components/pacientes/pacientes-routing.module').then(m => m.PacientesRoutingModule)},
    {path: 'roles',canActivate: [authGuard], loadChildren: () => import('./components/roles/roles-routing.module').then(m => m.RolesRoutingModule)},
    {path: 'usuarios', canActivate: [authGuard],loadChildren: () => import('./components/usuarios/usuarios-routing.module').then(m => m.UsuariosRoutingModule)},
    {path: 'inventario', canActivate: [authGuard],loadChildren: () => import('./components/inventario/inventario-routing.module').then(m => m.InventariosRoutingModule)},
    {path: 'almacen', canActivate: [authGuard],loadChildren: () => import('./components/almacen/almacen-routing.module').then(m => m.AlmacenRoutingModule)},
    {path: 'recetas',canActivate: [authGuard], loadChildren: () => import('./components/recetas/recetas-routing.module').then(m => m.RecetasRoutingModule)},
    {path: 'compras',canActivate: [authGuard], loadChildren: () => import('./components/compras/compras-routing.module').then(m => m.ComprasRoutingModule)},
    {path: 'pedidos',canActivate: [authGuard], loadChildren: () => import('./components/pedidos/pedidos-routing.module').then(m => m.PedidosRoutingModule)},
   
  ]},
  {path: 'authentication', loadChildren: () => import('./components/authentication/authentication-routing.module').then(m => m.AuthenticationRoutingModule)},

  { path: '**', redirectTo: 'authentication', pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
