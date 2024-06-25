import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrearComponent } from './crear/crear.component';
import { ListarComponent } from './listar/listar.component';
import { CambiarPasswordDialogComponent } from './passwordDialog/cambiar-password-dialog/cambiar-password-dialog.component';

@NgModule({
  declarations: [
    ListarComponent,
    CrearComponent,
    CambiarPasswordDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    UsuariosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    ListarComponent,
    CrearComponent,
  ]
})
export class UsuariosModule { }
