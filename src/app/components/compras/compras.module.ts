import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrearComponent } from './crear/crear.component';
import { ListarComponent } from './listar/listar.component';
import { ComprasRoutingModule } from './compras-routing.module';


@NgModule({
  declarations: [
    ListarComponent,
    CrearComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ComprasRoutingModule
  ],
  exports: [
    ListarComponent,
    CrearComponent,
  ]
})
export class ComprasModule { }
