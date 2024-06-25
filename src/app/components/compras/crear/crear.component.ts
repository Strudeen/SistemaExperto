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
import { LaboratorioService } from 'src/app/services/laboratorios/laboratorio.service';
import { Laboratorio } from 'src/app/models/laboratorio';




@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnChanges, OnInit {
  @Input() currentId = '';

  medicamentos: Medicamento[];
  roles: any[];
  fileFactura = '';
  fileRegistroSanitario = '';
  fileCertificadoRepresentacion = '';
  fileCertificadoEmpresa = '';
  show = false;
  laboratorios: Laboratorio[];


  tipoCompras: string[] = ['MENOR', 'MAYOR'];
  formData = new FormData();
  formData2 = new FormData();
  formData3 = new FormData();
  formData4 = new FormData();


  flagFactura = false;
  flagRegistroSanitario = false;
  flagCertificadoEmpresa = false;
  flagCertificadoRepresentacion = false;



  async onFileFactura(event: any, typeDocument: string) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileFactura = 'Validando Factura...'
      this.formData.append("file", file);
      this.show = !this.show;
      console.log(this.formData, 'FORMDATA');
      this.motorInferenciaService.postFileValidation(this.formData, typeDocument).subscribe(async (m) => {
        this.fileFactura = '';
        m.message.forEach((message:any) => {
          this.fileFactura += message + '\n';
        });
        const valido = m.message.find((m:any)=>m === 'El documento cuenta con la información correspondiente');

        if(valido){
          this.flagFactura = true;
        }

        this.show = false;
        this.formData = new FormData();
      });
    }
  }

  async onFileRegistroSanitario(event: any, typeDocument: string) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileRegistroSanitario = 'Validando Registro Sanitario...'
      this.formData2.append("file", file);
      this.show = !this.show;
      console.log(this.formData2, 'FORMDATA');
      this.motorInferenciaService.postFileValidation(this.formData2, typeDocument).subscribe(async (m) => {
        this.fileRegistroSanitario = '';
        m.message.forEach((message:any) => {
          this.fileRegistroSanitario += message + '\n';
        });

        const valido = m.message.find((m:any)=>m === 'El documento cuenta con la información correspondiente');
        const validoSello = m.message.find((m:any)=>m === 'El documento cuenta con el sello valido de la AGEMED');
        const validoFirma = m.message.find((m:any)=>m === 'Las firmas del documento han sido correctamente validadas');


        if(valido && validoSello && validoFirma){
          this.flagRegistroSanitario = true;
        }

        this.show = false;
        this.formData2 = new FormData();
      });
    }
  }

  async onFileCertificadoEmpresa(event: any, typeDocument: string) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileCertificadoEmpresa = 'Validando Certificado de Empresa...'
      this.formData3.append("file", file);
      this.show = !this.show;
      console.log(this.formData3, 'FORMDATA');
      this.motorInferenciaService.postFileValidation(this.formData3, typeDocument).subscribe(async (m) => {
        this.fileCertificadoEmpresa = '';
        m.message.forEach((message:any) => {
          this.fileCertificadoEmpresa += message + '\n';
        });
        
        const valido = m.message.find((m:any)=>m === 'El documento cuenta con la información correspondiente');
        const validoSello = m.message.find((m:any)=>m === 'El documento cuenta con el sello valido de la AGEMED');
        const validoFirma = m.message.find((m:any)=>m === 'Las firmas del documento han sido correctamente validadas');


        if(valido && validoSello && validoFirma){
          this.flagCertificadoEmpresa = true;
        }

        this.show = false;
        this.formData3 = new FormData();
      });
    }
  }

  async onFileRepresentacionLegal(event: any, typeDocument: string) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileCertificadoRepresentacion = 'Validando Certificado de Representación Legal...'
      this.formData4.append("file", file);
      this.show = !this.show;
      console.log(this.formData4, 'FORMDATA');
      this.motorInferenciaService.postFileValidation(this.formData4, typeDocument).subscribe(async (m) => {
        this.fileCertificadoRepresentacion = '';
        m.message.forEach((message:any) => {
          this.fileCertificadoRepresentacion += message + '\n';
        });

        const valido = m.message.find((m:any)=>m === 'El documento cuenta con la información correspondiente');
        const validoSello = m.message.find((m:any)=>m === 'El documento cuenta con el sello valido de la AGEMED');
        const validoFirma = m.message.find((m:any)=>m === 'Las firmas del documento han sido correctamente validadas');


        if(valido && validoSello && validoFirma){
          this.flagCertificadoRepresentacion = true;
        }

        this.show = false;
        this.formData4 = new FormData();
      });
    }
  }




  public data: CompraForm = {
    tipo: "",
    fecha: "",
    nombreEmpresa: "",
    documentos: [{
      fotoURL: "0"
    }, {
      fotoURL: "0"
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
  today: Date;
  constructor(
    private medicamentoService: MedicamentoService,
    private compraService: ComprasService,
    private motorInferenciaService: MotorInferenciaService,
    private laboratorioService: LaboratorioService,
  ) {
    this.today = new Date();
  }

  ngOnInit() {
    this.medicamentoService.getMedicamentos().subscribe(medicamentos => {
      this.medicamentos = medicamentos;
    });
    this.laboratorioService.getLaboratorios().subscribe(laboratorio => {
      this.laboratorios = laboratorio;
    })
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
            fotoURL: "0"
          }, {
            fotoURL: "0"
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
  // async ocrTest(url: string) {
  //   const worker = await createWorker('spa');
  //   const { data: { text } }: any = await worker.recognize(url);
  //   console.log(text);

  //   // const data:OCRFactura = {
  //   //   texto:text,
  //   //   fecha:this.data.fecha,
  //   //   nombreEmpresa:this.data.nombreEmpresa
  //   // }

  //   // this.motorInferenciaService.postFileValidation(data).subscribe(m =>{
  //   //   if(m.isValid){
  //   //     this.fileName = "Validado Correctamente";
  //   //   }
  //   // });
  //   await worker.terminate();
  // }
  // async ocrTest2(url: string) {
  //   const worker = await createWorker('spa');
  //   const { data: { text } }: any = await worker.recognize(url);
  //   console.log(text);

  //   const data: OCRCertificadoEmpresa = {
  //     texto:text,
  //     fecha:this.data.fecha,
  //     nombreEmpresa:this.data.nombreEmpresa
  //   }

  //   this.motorInferenciaService.postOCRCertificadEmpresa(data).subscribe(m =>{
  //     if(m.isValid){
  //       this.fileName2 = "Validado Correctamente";
  //     }
  //   });
  //   await worker.terminate();
  // }
}
