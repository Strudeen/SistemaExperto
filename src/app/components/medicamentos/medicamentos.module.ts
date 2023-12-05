import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicamentosRoutingModule } from './medicamentos-routing.module';


import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarComponent } from './listar/listar.component';
import { CrearComponent } from './crear/crear.component';


@NgModule({
  declarations: [
    ListarComponent,
    CrearComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MedicamentosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    ListarComponent,
    CrearComponent,
  ]
})
export class MedicamentosModule { }
