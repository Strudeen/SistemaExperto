import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarComponent } from './listar/listar.component';
import { CrearComponent } from './crear/crear.component';
import { InventariosRoutingModule } from './inventario-routing.module';
import { ListarDatosComponent } from './listarDatos/listar-datos.component';
import { CrearDatosComponent } from './crearDatos/crear-datos.component';


@NgModule({
  declarations: [
    ListarComponent,
    CrearComponent,
    ListarDatosComponent,
    CrearDatosComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    InventariosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    ListarComponent,
    CrearComponent,
  ]
})
export class InventariosModule { }
