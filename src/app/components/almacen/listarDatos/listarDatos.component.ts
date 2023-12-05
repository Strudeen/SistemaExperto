import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlmacenDatos } from 'src/app/models/almacen';
import { AlmacenDatosService } from 'src/app/services/almacenes/almacen-datos.service';

@Component({
  selector: 'app-listarDatos',
  templateUrl: './listarDatos.component.html',
  styleUrls: ['./listarDatos.component.css']
})
export class ListarDatosComponent implements AfterViewInit, OnDestroy{
  almacenes: AlmacenDatos[];
  subscription: Subscription;
  displayedColumns: string[] = ['fechaCaducidad', 'codigoLaboratorio','cantidad','nroLote','state', 'acciones'];
  dataSource: MatTableDataSource<AlmacenDatos>;

  almacenId:string = '';

  almacenRouteId:string = '';
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private almacenService: AlmacenDatosService,
     private dialog: MatDialog,
     private router: Router,
     private route: ActivatedRoute,) {
      
    this.almacenRouteId = this.route.snapshot.params['id'];
    this.subscription = almacenService.data$.subscribe((almacen) => {
      this.dataSource.data = almacen.datos;
    });

    this.dataSource = new MatTableDataSource(this.almacenes);
    this.almacenService.updateTableData(this.almacenRouteId);

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

  editarAlmacen(almacenId: string) {
    this.almacenId = almacenId;
    
  }

  eliminarAlmacen(almacenId: string, state: boolean) {
    this.almacenService.delAlmacen(almacenId, !state).subscribe((resp)=>{
      if(resp){
        this.almacenService.updateTableData(this.almacenRouteId);
      }
    });
  }
}
