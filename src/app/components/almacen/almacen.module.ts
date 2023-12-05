import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlmacenRoutingModule } from './almacen-routing.module';
import { CrearComponent } from './crear/crear.component';
import { CrearDatosComponent } from './crearDatos/crearDatos.component';
import { ListarComponent } from './listar/listar.component';
import { ListarDatosComponent } from './listarDatos/listarDatos.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CrearComponent,
    CrearDatosComponent,
    ListarComponent,
    ListarDatosComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AlmacenRoutingModule
  ],
  exports: [
    ListarComponent,
    CrearComponent,
  ]
})
export class AlmacenModule { }
