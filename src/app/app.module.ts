import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';


import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuComponent } from './components/menu/menu.component';

import { ArchivosComponent } from './components/archivos/archivos.component';
import { MedicamentosModule } from './components/medicamentos/medicamentos.module';
import { LaboratoriosModule } from './components/laboratorios/laboratorios.module';
import { PacientesModule } from './components/pacientes/pacientes.module';
import { RolesModule } from './components/roles/roles.module';
import { UsuariosModule } from './components/usuarios/usuarios.module';
import { InventariosModule } from './components/inventario/inventario.module';
import { AlmacenModule } from './components/almacen/almacen.module';
import { RecetasModule } from './components/recetas/recetas.module';
import { DatePipe } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AuthenticationModule } from './components/authentication/authentication.module';
import { ComprasModule } from './components/compras/compras.module';
import { PedidosModule } from './components/pedidos/pedidos.module';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ArchivosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MedicamentosModule,
    LaboratoriosModule,
    PacientesModule,
    RolesModule,
    UsuariosModule,
    InventariosModule,
    AlmacenModule,
    RecetasModule,
    AuthenticationModule,
    ComprasModule,
    PedidosModule
  ],
  providers: [
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }

    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
