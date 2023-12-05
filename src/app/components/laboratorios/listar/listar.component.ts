import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Laboratorio } from 'src/app/models/laboratorio';
import { CrearComponent } from '../crear/crear.component';
import { LaboratorioService } from 'src/app/services/laboratorios/laboratorio.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements AfterViewInit, OnDestroy {
  laboratorios: Laboratorio[];
  subscription: Subscription;
  displayedColumns: string[] = ['codigo', 'nombre', 'nit', 'telefono', 'celular', 'email', 'state', 'acciones'];
  dataSource: MatTableDataSource<Laboratorio>;

  laboratorioId:string = '';


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private labortorioService: LaboratorioService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.laboratorios);
    this.subscription = labortorioService.data$.subscribe((laboratorios) => {
      this.dataSource.data = laboratorios;
    });
    this.labortorioService.updateTableData();
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
  editarLaboratorio(laboratorioId: string) {
    this.laboratorioId = laboratorioId;
    console.log(laboratorioId);
  }

  eliminarLaboratorio(laboratorioId: string, state: boolean) {
    this.labortorioService.delLaboratorio(laboratorioId, !state).subscribe((resp)=>{
      if(resp){
        console.log(resp.msg);
        console.log(laboratorioId);
        this.labortorioService.updateTableData();
      }
    });
  }

}
