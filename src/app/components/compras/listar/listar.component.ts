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
import { Compra } from 'src/app/models/compras';
import { ComprasService } from 'src/app/services/compras/compras.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent  implements AfterViewInit, OnDestroy {
  compras: Compra[];
  subscription: Subscription;
  displayedColumns: string[] = ['tipo', 'fecha', 'precioTotal', 'state', 'acciones'];
  dataSource: MatTableDataSource<Compra>;

  compraId:string = '';


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  constructor(private comprasService: ComprasService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.compras);
    this.subscription = comprasService.data$.subscribe((compras) => {

      this.dataSource.data = compras;

      console.log(compras);
    });
    this.comprasService.updateTableData();
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
    this.compraId = recetaId;
    console.log(recetaId);
  }

  eliminarReceta(recetaId: string, state: boolean) {
    this.comprasService.delCompra(recetaId, !state).subscribe((resp)=>{
      if(resp){
        this.comprasService.updateTableData();
      }
    });
  }


}
