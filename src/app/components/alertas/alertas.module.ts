import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertasRoutingModule } from './alertas-routing.module';
import { AlertasAlmacenComponent } from './alertasAlmacen/alertas-almacen/alertas-almacen.component';
import { MaterialModule } from 'src/app/material.module';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AlertasAlmacenComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatDialogModule,
    AlertasRoutingModule
  ],
  exports: [
    AlertasAlmacenComponent
  ]
})
export class AlertasModule { }
