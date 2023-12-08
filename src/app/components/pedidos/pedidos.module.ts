import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { ListarComponent } from './listar/listar.component';
import { CrearComponent } from './crear/crear.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    ListarComponent,
    CrearComponent
  ],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  providers: [
    DatePipe // Añade DatePipe a los providers
  ],
  exports: [
    ListarComponent,
    CrearComponent
  ]
})
export class PedidosModule { }
