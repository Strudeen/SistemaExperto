import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Medicamento } from 'src/app/models/medicamento';
import { CrearComponent } from '../crear/crear.component';

import { Inventario } from 'src/app/models/inventario';
import { InventarioService } from 'src/app/services/inventarios/inventario.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ReportesFarmaciaService } from 'src/app/services/reportesFarmacia/reportes-farmacia.service';
import { ReportesFarmaciaPDFService } from 'src/app/services/reportesFarmacia/reportes-farmacia-pdf.service';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements AfterViewInit, OnDestroy{
  inventarios: Inventario[];
  subscription: Subscription;
  displayedColumns: string[] = ['codigo', 'cantidad','state', 'acciones'];
  dataSource: MatTableDataSource<Inventario>;
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  inventarioId:string = '';
  
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private inventarioService: InventarioService,
    private reporteService: ReportesFarmaciaService,
    
     private dialog: MatDialog,
     private router: Router,
     private pdfService: ReportesFarmaciaPDFService) {
    this.dataSource = new MatTableDataSource(this.inventarios);
    this.subscription = inventarioService.data$.subscribe((inventario) => {
      this.dataSource.data = inventario;
    });
    this.inventarioService.updateTableData();
    
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
    console.log(inventarioId);
  }

  eliminarInventario(inventarioId: string, state: boolean) {
    this.inventarioService.delInventario(inventarioId, !state).subscribe((resp)=>{
      if(resp){
        console.log(resp.msg);
        console.log(inventarioId);
        this.inventarioService.updateTableData();
      }
    });
  }
  verInventarioData(inventarioId: string) {
    this.router.navigate([`/inventario/datos/${inventarioId}`]); 
  }

  getReportes() {
    const data = {
      mesInicio: this.range.get('start')?.value,
      mesFinal: this.range.get('end')?.value,
    }

    console.log(data);

    this.reporteService.getReportesFarmacia(data).subscribe(pdf => {
      
      this.pdfService.generateFarmaciaPDF(pdf);
    });
  }
}
