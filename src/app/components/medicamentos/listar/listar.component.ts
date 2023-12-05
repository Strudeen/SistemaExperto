import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Medicamento } from 'src/app/models/medicamento';
import { CrearComponent } from '../crear/crear.component';
import { MedicamentoService } from 'src/app/services/medicamentos/medicamento.service';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements AfterViewInit, OnDestroy{
  medicamentos: Medicamento[];
  subscription: Subscription;
  displayedColumns: string[] = ['codigo', 'nombre', 'descripcion', 'tipo', 'exclusividad', 'state', 'acciones'];
  dataSource: MatTableDataSource<Medicamento>;

  medicamentoId:string = '';
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private medicamentoService: MedicamentoService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.medicamentos);
    this.subscription = medicamentoService.data$.subscribe((medicamentos) => {
      this.dataSource.data = medicamentos;
    });
    this.medicamentoService.updateTableData();
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

  editarMedicamento(medicamentoId: string) {
    this.medicamentoId = medicamentoId;
    console.log(medicamentoId);
  }

  eliminarMedicamento(medicamentoId: string, state: boolean) {
    this.medicamentoService.delMedicamento(medicamentoId, !state).subscribe((resp)=>{
      if(resp){
        console.log(resp.msg);
        console.log(medicamentoId);
        this.medicamentoService.updateTableData();
      }
    });
  }
}
