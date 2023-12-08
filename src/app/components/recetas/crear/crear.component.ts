import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CrearUsuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import { RolService } from 'src/app/services/roles/rol.service';
import { RecetaForm } from 'src/app/models/receta';
import { RecetaService } from 'src/app/services/recetas/receta.service';
import { Medicamento } from 'src/app/models/medicamento';
import { ComprasService } from 'src/app/services/compras/compras.service';



interface tipoCancer{
  tipoCancer:string
}


@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnChanges, OnInit {
  @Input() currentId = '';

  roles: any[];

  medicamentos: Medicamento

  tipoCancers: tipoCancer[] = [
     {tipoCancer:'Cáncer de Mama'}, 
     {tipoCancer:'Cáncer de Prostata'}, 
     {tipoCancer:'Cáncer de Pulmón'}, 
     {tipoCancer:'Cáncer de Hematólogicos'},
     {tipoCancer:'Cáncer de Cabeza y Cuello'},
  ];


  fileName = '';
  fileName2 = '';
  show = false;
  

  tipoCompras: string[] = ['MENOR', 'MAYOR'];
  formData = new FormData();
  formData2 = new FormData();

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.formData.append("file", file);
      this.show = !this.show;
      this.compraService.onFileSaved(this.formData).subscribe(async (m) => {
        console.log(m)
        
        if (m) {
  
          this.data.fotoURL = "http://localhost:3000/api/file/" + m.file.id;
          this.show = !this.show;
        }

      });
    }
  }



  public data: RecetaForm = {
    tipoReceta: '',
    fechaReceta: '',
    ciPaciente: '',
    diagnostico: [],
    diagnosticoMedicamentos: [{
      medicamentosEntregados: [],
      codigoMedicamento: "",
      cantidadSolicitada: 0,
      cantidadEntregada: 0,
    }],
    fotoURL: ''
  };

  tipoReceta = []
  tipoCancer: any;
  sexos: any;
  constructor(
    private compraService: ComprasService,
    private recetaService: RecetaService,
  ) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    // Si el valor del currentId cambia, entonces listar con el id
    console.log(this.currentId);
    if (changes['currentId'].currentValue !== changes['currentId'].previousValue
      && this.currentId !== '') {
      this.recetaService.getReceta(this.currentId).subscribe((receta) => {
        if (receta) {
          console.log(receta)
          this.data.tipoReceta = receta.tipoReceta;
          this.data.fechaReceta = receta.fechaReceta;
          this.data.ciPaciente = receta.ciPaciente;
          this.data.diagnostico = receta.diagnostico;
          this.data.diagnosticoMedicamentos = receta.diagnosticoMedicamentos;
          this.data.fotoURL = receta.fotoURL;
          changes['currentId'] = new SimpleChange(changes['currentId'] ,'',true);
        }
      })
    }
  }

  addMed(){
    this.data.diagnosticoMedicamentos.push({
      medicamentosEntregados: [],
      codigoMedicamento: "",
      cantidadSolicitada: 0,
      cantidadEntregada: 0,
    })
  }

  deleteMedForm(index:number){
    this.data.diagnosticoMedicamentos.splice(index,1)
  }


  saveData() {
    console.log(JSON.stringify(this.data.diagnostico));
    if (this.currentId) {
      this.recetaService.putReceta(this.currentId, this.data).subscribe((resp) => {
        if (resp) {
          console.log(resp.msg);
          console.log(JSON.stringify(this.data.diagnostico));
          this.currentId = '';
          this.data = {
            tipoReceta: '',
            fechaReceta: '',
            ciPaciente: '',
            diagnostico: [],
            diagnosticoMedicamentos: [{
              medicamentosEntregados: [],
              codigoMedicamento: "",
              cantidadSolicitada: 0,
              cantidadEntregada: 0,
            }],
            fotoURL: ''
          };
          this.recetaService.updateTableData();
        }
      })
    }
    else {
      this.recetaService.postReceta(this.data).subscribe((resp) => {
        if (resp) {
          
          console.log(resp.msg);
          this.currentId = '';
          this.data = {
            tipoReceta: '',
            fechaReceta: '',
            ciPaciente: '',
            diagnostico: [],
            diagnosticoMedicamentos: [{
              medicamentosEntregados: [],
              codigoMedicamento: "",
              cantidadSolicitada: 0,
              cantidadEntregada: 0,
            }],
            fotoURL: ''
          };
          this.recetaService.updateTableData();
        }
      })
    }
  }
}
