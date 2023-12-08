import { CommonModule, DatePipe } from '@angular/common';
import { AfterViewInit, Component, Inject, OnDestroy, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Medicamentos, Pedido } from 'src/app/models/pedido';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements AfterViewInit, OnDestroy {

  pedidos: Pedido[];
  subscription: Subscription;
  displayedColumns: string[] = ['estado', 'medicamentos', 'fechaPedido', 'acciones'];
  dataSource: MatTableDataSource<Pedido>;

  pedidoId: string = '';


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  userRole: string;





  constructor(
    private datePipe: DatePipe,
    private pedidoService: PedidosService,
    private authService: AuthenticationService,
    private dialog: MatDialog) {
    this.userRole = this.authService.getUsuarioRol();
    this.dataSource = new MatTableDataSource(this.pedidos);
    this.subscription = pedidoService.data$.subscribe((pedidos) => {

      this.dataSource.data = pedidos;

      console.log(pedidos);
    });

    this.pedidoService.updateTableData();
  }
  openDialog(index:number): void {
    const dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      data: this.dataSource.data[index].medicamentos
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  formatDate(dateString: string): any {
    return this.datePipe.transform(dateString, 'yyyy-MM-dd');
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

  actualizarPedido(pedidoId: string, nuevoEstado: string) {
    this.pedidoService.actualizarPedido(pedidoId, nuevoEstado).subscribe(
      resp => {
        console.log(resp.mensaje);
        this.pedidoService.updateTableData();
      },
      error => {
        console.error('Error al actualizar el pedido:', error);
      }
    );
  }

  cancelarPedido(pedidoId: string) {
    this.pedidoService.delPedido(pedidoId).subscribe(
      resp => {
        console.log(resp.mensaje);
        this.pedidoService.updateTableData();
      },
      error => {
        console.error('Error al cancelar el pedido:', error);
      }
    );
  }
}

@Component({
  selector: 'dialog-detalles-dialog',
  templateUrl: './dialog-detalles.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule],
})
export class DialogElementsExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogElementsExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Medicamentos[],
  ) {
    console.log(data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
