import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertasRoutingModule } from './alertas-routing.module';
import { AlertasAlmacenComponent } from './alertasAlmacen/alertas-almacen/alertas-almacen.component';
import { MaterialModule } from 'src/app/material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { AlertasInventarioComponent } from './alertasInventario/alertas-inventario/alertas-inventario.component';


@NgModule({
  declarations: [
    AlertasAlmacenComponent,
    AlertasInventarioComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatDialogModule,
    AlertasRoutingModule
  ],
  exports: [
    AlertasAlmacenComponent,
    AlertasInventarioComponent
  ]
})
export class AlertasModule { }
