import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstitucionRoutingModule } from './institucion-routing.module';
import { InstitucionComponent } from './institucion/institucion.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { InstitucionEditarComponent } from './institucionEditar/institucion-editar/institucion-editar.component';


@NgModule({
  declarations: [
    InstitucionComponent,
    InstitucionEditarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatCardModule,
    InstitucionRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    InstitucionComponent,

  ]
})
export class InstitucionModule { }
