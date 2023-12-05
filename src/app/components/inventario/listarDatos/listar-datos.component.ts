import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Medicamento } from 'src/app/models/medicamento';
import { CrearComponent } from '../crear/crear.component';

import { Inventario, InventarioDatos, InventarioEntity } from 'src/app/models/inventario';
import { ActivatedRoute, Router } from '@angular/router';
import { InventarioDatosService } from 'src/app/services/inventarios/inventario-datos.service';


@Component({
  selector: 'app-listar',
  templateUrl: './listar-datos.component.html',
  styleUrls: ['./listar-datos.component.css']
})
export class ListarDatosComponent implements AfterViewInit, OnDestroy{
  inventarios: InventarioDatos[];
  subscription: Subscription;
  displayedColumns: string[] = ['fechaCaducidad', 'codigoLaboratorio','cantidad','nroLote','state', 'acciones'];
  dataSource: MatTableDataSource<InventarioDatos>;

  inventarioId:string = '';

  inventarioRouteId:string = '';
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private inventarioService: InventarioDatosService,
     private dialog: MatDialog,
     private router: Router,
     private route: ActivatedRoute,) {
      
    this.inventarioRouteId = this.route.snapshot.params['id'];
    this.subscription = inventarioService.data$.subscribe((inventario) => {
      this.dataSource.data = inventario.datos;
    });

    this.dataSource = new MatTableDataSource(this.inventarios);
    this.inventarioService.updateTableData(this.inventarioRouteId);

    
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

  editarInventario(inventarioId: string) {
    this.inventarioId = inventarioId;
    
  }

  eliminarInventario(inventarioId: string, state: boolean) {
    this.inventarioService.delInventario(inventarioId, !state).subscribe((resp)=>{
      if(resp){
        this.inventarioService.updateTableData(this.inventarioRouteId);
      }
    });
  }
}
