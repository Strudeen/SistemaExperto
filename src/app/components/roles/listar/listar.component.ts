import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Rol } from 'src/app/models/rol';
import { CrearComponent } from '../crear/crear.component';
import { RolService } from 'src/app/services/roles/rol.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements AfterViewInit, OnDestroy {
  roles: Rol[];
  subscription: Subscription;
  displayedColumns: string[] = ['nombre', 'descripcion' ,'state', 'acciones'];
  dataSource: MatTableDataSource<Rol>;

  rolId:string = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private rolService: RolService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.roles);
    this.subscription = rolService.data$.subscribe((roles) => {
      this.dataSource.data = roles;
    });
    this.rolService.updateTableData();
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

  editarRol(rolId: string) {
    this.rolId = rolId;
    console.log(rolId);
  }

  eliminarRol(rolId: string, state: boolean) {
    this.rolService.delRol(rolId, !state).subscribe((resp)=>{
      if(resp){
        console.log(resp.msg);
        console.log(rolId);
        this.rolService.updateTableData();
      }
    });
  }


}
