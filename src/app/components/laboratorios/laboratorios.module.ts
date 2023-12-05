import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaboratoriosRoutingModule } from './laboratorios-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrearComponent } from './crear/crear.component';
import { ListarComponent } from './listar/listar.component';



@NgModule({
  declarations: [
    ListarComponent,
    CrearComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    LaboratoriosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    ListarComponent,
    CrearComponent,
  ]
})
export class LaboratoriosModule { }
