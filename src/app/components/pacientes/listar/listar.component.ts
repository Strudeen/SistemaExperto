import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Paciente } from 'src/app/models/paciente';
import { CrearComponent } from '../crear/crear.component';
import { PacienteService } from 'src/app/services/pacientes/paciente.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements AfterViewInit, OnDestroy {
  pacientes: Paciente[];
  subscription: Subscription;
  displayedColumns: string[] = ['ci', 'nombre', 'apellido', 'edad', 'state', 'acciones'];
  dataSource: MatTableDataSource<Paciente>;

  pacienteId:string = '';


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private pacienteService: PacienteService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.pacientes);
    this.subscription = pacienteService.data$.subscribe((pacientes) => {
      this.dataSource.data = pacientes;
    });
    this.pacienteService.updateTableData();
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

  editarPaciente(pacienteId: string) {
    this.pacienteId = pacienteId;
    console.log(pacienteId);
  }

  eliminarPaciente(pacienteId: string, state: boolean) {
    this.pacienteService.delPaciente(pacienteId, !state).subscribe((resp)=>{
      if(resp){
        console.log(resp.msg);
        console.log(pacienteId);
        this.pacienteService.updateTableData();
      }
    });
  }

}
