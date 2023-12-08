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
import { CompraForm } from 'src/app/models/compras';
import { ComprasService } from 'src/app/services/compras/compras.service';
import { createWorker } from 'tesseract.js';
import { MotorInferenciaService } from 'src/app/services/compras/motorInferencia.service';
import { OCRCertificadoEmpresa, OCRFactura } from 'src/app/models/ocr';
import { Medicamento } from 'src/app/models/medicamento';
import { MedicamentoService } from 'src/app/services/medicamentos/medicamento.service';




@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnChanges, OnInit {
  @Input() currentId = '';

  medicamentos: Medicamento[];
  roles: any[];
  fileName = '';
  fileName2 = '';
  show = false;
  

  tipoCompras: string[] = ['MENOR', 'MAYOR'];
  formData = new FormData();
  formData2 = new FormData();

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = "Validando...";
      this.formData.append("file", file);
      this.show = !this.show;
      this.compraService.onFileSaved(this.formData).subscribe(async (m) => {
        console.log(m)
        
        if (m) {
          
          this.data.documentos[0].fotoURL = "http://localhost:3000/api/file/" + m.file.id;
          await this.ocrTest( this.data.documentos[0].fotoURL);
          this.show = !this.show;
        }

      });
    }
  }
  async onFileSelected2(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName2 = "Validando...";
      this.formData2.append("file", file);
      this.show = !this.show;
    }
    this.compraService.onFileSaved(this.formData2).subscribe(async(m) => {

      if (m) {
        
        this.data.documentos[1].fotoURL = "http://localhost:3000/api/file/" + m.file.id;
        await this.ocrTest2( this.data.documentos[1].fotoURL);
        this.show = !this.show;
      }

    });
  }
  public data: CompraForm = {
    tipo: "",
    fecha: "",
    nombreEmpresa: "",
    documentos: [{
      fotoURL: ""
    }, {
      fotoURL: ""
    }],
    medicamento: [{
      codigoMedicamento: "",
      cantidad: 0,
      nroLote: "",
      codigoLaboratorio: "",
      fechaCaducidad: "",
      precioUnitario: 0
    }],
  };

  constructor(
    private medicamentoService: MedicamentoService,
    private compraService: ComprasService,
    private motorInferenciaService:MotorInferenciaService
  ) { }

  ngOnInit() {
    this.medicamentoService.getMedicamentos().subscribe(medicamentos => {
      this.medicamentos = medicamentos;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // Si el valor del currentId cambia, entonces listar con el id
  }

  addMed() {
    this.data.medicamento.push({
      codigoMedicamento: "",
      cantidad: 0,
      nroLote: "",
      codigoLaboratorio: "",
      fechaCaducidad: "",
      precioUnitario: 0
    })
  }

  deleteMedForm(index: number) {
    this.data.medicamento.splice(index, 1)
  }


  saveData() {
    console.log(JSON.stringify(this.data.documentos));
    this.compraService.postCompra(this.data).subscribe((resp) => {
      if (resp) {
        console.log(resp.msg);
        console.log(JSON.stringify(this.data.documentos));
        this.currentId = '';
        this.data = {
          tipo: "",
          fecha: "",
          nombreEmpresa: "",
          documentos: [{
            fotoURL: ""
          }, {
            fotoURL: ""
          }],
          medicamento: [{
            codigoMedicamento: "",
            cantidad: 0,
            nroLote: "",
            codigoLaboratorio: "",
            fechaCaducidad: "",
            precioUnitario: 0
          }],
        };
        this.compraService.updateTableData();
      }
    });
  }
  async ocrTest(url: string) {
    const worker = await createWorker('spa');
    const { data: { text } }: any = await worker.recognize(url);
    console.log(text);

    const data:OCRFactura = {
      texto:text,
      fecha:this.data.fecha,
      nombreEmpresa:this.data.nombreEmpresa
    }

    this.motorInferenciaService.postOCRFacturas(data).subscribe(m =>{
      if(m.isValid){
        this.fileName = "Validado Correctamente";
      }
    });
    await worker.terminate();
  }
  async ocrTest2(url: string) {
    const worker = await createWorker('spa');
    const { data: { text } }: any = await worker.recognize(url);
    console.log(text);

    const data: OCRCertificadoEmpresa = {
      texto:text,
      fecha:this.data.fecha,
      nombreEmpresa:this.data.nombreEmpresa
    }

    this.motorInferenciaService.postOCRCertificadEmpresa(data).subscribe(m =>{
      if(m.isValid){
        this.fileName2 = "Validado Correctamente";
      }
    });
    await worker.terminate();
  }
}
