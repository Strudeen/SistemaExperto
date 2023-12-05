import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Almacen } from 'src/app/models/almacen';
import { AlmacenService } from 'src/app/services/almacenes/almacen.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements AfterViewInit, OnDestroy{
  almacenes: Almacen[];
  subscription: Subscription;
  displayedColumns: string[] = ['codigo', 'cantidad','state', 'acciones'];
  dataSource: MatTableDataSource<Almacen>;

  almacenId:string = '';
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private almacenService: AlmacenService,
     private dialog: MatDialog,
     private router: Router,) {
    this.dataSource = new MatTableDataSource(this.almacenes);
    this.subscription = almacenService.data$.subscribe((almacen) => {
      this.dataSource.data = almacen;
    });
    this.almacenService.updateTableData();
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
    console.log(almacenId);
  }

  eliminarAlmacen(almacenId: string, state: boolean) {
    this.almacenService.delAlmacen(almacenId, !state).subscribe((resp)=>{
      if(resp){
        console.log(resp.msg);
        console.log(almacenId);
        this.almacenService.updateTableData();
      }
    });
  }
  verAlmacenData(almacenId: string) {
    this.router.navigate([`/almacen/datos/${almacenId}`]); 
  }
}