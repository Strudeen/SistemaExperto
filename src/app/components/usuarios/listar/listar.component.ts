import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { CrearComponent } from '../crear/crear.component';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import { CambiarPasswordDialogComponent } from '../passwordDialog/cambiar-password-dialog/cambiar-password-dialog.component';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent  implements AfterViewInit, OnDestroy {
  usuarios: Usuario[];
  subscription: Subscription;
  displayedColumns: string[] = ['ci', 'nombre', 'apellido', 'sexo', 'email', 'rol', 'state', 'acciones'];
  dataSource: MatTableDataSource<Usuario>;
  showPassword: boolean = true
  usuarioId:string = '';


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  constructor(private usuarioService: UsuarioService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.usuarios);
    this.subscription = usuarioService.data$.subscribe((usuarios) => {

      this.dataSource.data = usuarios;

      console.log(usuarios);
    });
    this.usuarioService.updateTableData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editarUsuario(usuarioId: string) {
    this.usuarioId = usuarioId;
    console.log(usuarioId);
    this.ocultarPassword();
  }


  ocultarPassword(){
    this.showPassword = false;  
  }

  eliminarUsuario(usuarioId: string, state: boolean) {
    this.usuarioService.delUsuario(usuarioId, !state).subscribe((resp)=>{
      if(resp){
        console.log(resp.msg);
        console.log(usuarioId);
        this.usuarioService.updateTableData();
      }
    });
  }
  openChangePasswordDialog(usuarioId: string) {
    const dialogRef = this.dialog.open(CambiarPasswordDialogComponent, {
      width: '400px',
      data: { usuarioId: usuarioId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Contraseña cambiada exitosamente');
      } else {
        console.log('Cambio de contraseña cancelado');
      }
    });
  }

}
