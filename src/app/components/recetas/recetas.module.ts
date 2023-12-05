import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrearComponent } from './crear/crear.component';
import { ListarComponent } from './listar/listar.component';
import { RecetasRoutingModule } from './recetas-routing.module';

@NgModule({
  declarations: [
    ListarComponent,
    CrearComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RecetasRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    ListarComponent,
    CrearComponent,
  ]
})
export class RecetasModule { }
