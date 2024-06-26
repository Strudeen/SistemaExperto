import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Almacen } from 'src/app/models/almacen';
import { CrearPedido } from 'src/app/models/pedido';
import { AlmacenService } from 'src/app/services/almacenes/almacen.service';
import { MedicamentoService } from 'src/app/services/medicamentos/medicamento.service';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';






@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnChanges, OnInit {
  @Input() currentId = '';


  medicamentos: any[];
  almacenes: Almacen[];

  // nuevoEstado: tipoCancer[] = [
  //    {tipoCancer:'Cáncer de Mama'}, 
  //    {tipoCancer:'Cáncer de Prostata'}, 
  //    {tipoCancer:'Cáncer de Pulmón'}, 
  //    {tipoCancer:'Cáncer de Hematólogicos'},
  //    {tipoCancer:'Cáncer de Cabeza y Cuello'},
  // ];



  public data: CrearPedido = {

    medicamentos: [{
      codigoMedicamento: "",
      cantidadSolicitada: 0,
    }],

  };

  // tipoReceta = []
  // tipoCancer: any;
  // sexos: any;
  constructor(
    private pedidosService: PedidosService,
    private medicamentosService: MedicamentoService,
    private almacenService: AlmacenService,
  ) { }

  ngOnInit() {
    this.medicamentosService.getMedicamentos().subscribe(medicamentos =>{
      this.medicamentos = medicamentos
      console.log(this.medicamentos);
    });
    this.almacenService.getAlmacenes().subscribe(almacenes => {
      this.almacenes = almacenes
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    // Si el valor del currentId cambia, entonces listar con el id
    console.log(this.currentId);
    if (changes['currentId'].currentValue !== changes['currentId'].previousValue
      && this.currentId !== '') {
      this.pedidosService.getPedido(this.currentId).subscribe((pedido) => {
        if (pedido) {
          console.log(pedido)
          changes['currentId'] = new SimpleChange(changes['currentId'], '', true);
        }
      })
    }
  }

  addMed() {
    this.data.medicamentos.push({
      codigoMedicamento: "",
      cantidadSolicitada: 0,
    })
  }

  deleteMedForm(index: number) {
    this.data.medicamentos.splice(index, 1)
  }


  saveData() {

    this.pedidosService.postPedido(this.data).subscribe((resp) => {
      if (resp) {

        console.log(resp.msg);
        this.currentId = '';
        this.data = {
          medicamentos: [{
            codigoMedicamento: "",
            cantidadSolicitada: 0,
          }],
        };
        this.pedidosService.updateTableData();
      }
    })
  }
}
