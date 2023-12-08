import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { CrearComponent } from '../crear/crear.component';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import { Receta } from 'src/app/models/receta';
import { RecetaService } from 'src/app/services/recetas/receta.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent  implements AfterViewInit, OnDestroy {
  recetas: Receta[];
  subscription: Subscription;
  displayedColumns: string[] = ['tipoReceta', 'fechaReceta', 'ciPaciente', 'state', 'acciones'];
  dataSource: MatTableDataSource<Receta>;

  recetaId:string = '';


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  constructor(private recetaService: RecetaService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.recetas);
    this.subscription = recetaService.data$.subscribe((recetas) => {

      this.dataSource.data = recetas;

      console.log(recetas);
    });
    this.recetaService.updateTableData();
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

  editarReceta(recetaId: string) {
    this.recetaId = recetaId;
    console.log(recetaId);
  }

  eliminarReceta(recetaId: string, state: boolean) {
    this.recetaService.delReceta(recetaId, !state).subscribe((resp)=>{
      if(resp){
        console.log(resp.msg);
        console.log(recetaId);
        this.recetaService.updateTableData();
      }
    });
  }


}
