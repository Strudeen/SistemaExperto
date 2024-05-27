import { Injectable } from '@angular/core';
import jsPDF from 'jspdf'
import 'jspdf-autotable'

@Injectable({
  providedIn: 'root'
})
export class ReportesPdfService {
  tableDataEmpleados: any[];
  tableDataEquipos: any[];

  generatePDF(dataPDFs: any[]) {

    const doc = new jsPDF();

    // Agregar imagen en la esquina superior derecha
    const logoImg = new Image();
    const logoImg2 = new Image();
    logoImg.src = 'assets/imagenes/logoABEN.png'; // Reemplaza 'url_de_tu_imagen' con la URL de tu imagen
    logoImg2.src = 'assets/imagenes/logoCMNYRBLACK.png';
    doc.addImage(logoImg, 'JPEG', 10, 10, 120, 20); // Ajusta las coordenadas y dimensiones aquí
    doc.addImage(logoImg2, 'PNG', doc.internal.pageSize.getWidth() - 30, 10, 25, 18);

    //doc.setFont("helvetica"); // Cambia "helvetica" a la fuente que desees
    doc.setFontSize(8);
    //
    doc.setFont('times', 'bold');
    // Agregar texto centrado debajo de la imagen
    const firstText = 'ESTADO PLURINACIONAL DE BOLIVIA';
    const firstTextWidth = doc.getStringUnitWidth(firstText) * doc.getFontSize() / doc.internal.scaleFactor;
    const firstTextX = (doc.internal.pageSize.getWidth() - firstTextWidth) / 2;

    // Agregar más textos centrados debajo del anterior
    const secondText = 'MINISTERIO DE HIDROCARBUROS Y ENERGÍAS';
    const secondTextWidth = doc.getStringUnitWidth(secondText) * doc.getFontSize() / doc.internal.scaleFactor;
    const secondTextX = (doc.internal.pageSize.getWidth() - secondTextWidth) / 2;

    const thirdText = 'CENTRO DE MEDICINA NUCLEAR Y RADIOTERAPIA - AGENCIA BOLIVIANA DE ENERGÍA NUCLEAR';
    const thirdTextWidth = doc.getStringUnitWidth(thirdText) * doc.getFontSize() / doc.internal.scaleFactor;
    const thirdTextX = (doc.internal.pageSize.getWidth() - thirdTextWidth) / 2;



    doc.text(firstText, firstTextX, 40);
    doc.text(secondText, secondTextX, 43);
    doc.text(thirdText, thirdTextX, 46);


    doc.setFontSize(13);
    const fifthText = 'REPORTE DE INVENTARIO DE ALMACÉN';
    const fifthTextWidth = doc.getStringUnitWidth(fifthText) * doc.getFontSize() / doc.internal.scaleFactor;
    const fifthTextX = (doc.internal.pageSize.getWidth() - fifthTextWidth) / 2;

    doc.text(fifthText, fifthTextX, 53);

    this.tableDataEmpleados = dataPDFs.map((dataAlmacen: any, index: number) => {
      let data = [];

      if (index === 0) {
        data.push([
          { content: "#", styles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'bold' } },
          { content: "Codigo Medicamento", styles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'bold' } },
          { content: "Entrada", styles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'bold' } },
          { content: "Salida", styles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'bold' } },
          { content: "Cantidad Actual", styles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'bold' } },
          
        ]);
      }
     
      data.push([
        { content: `${index + 1}` },
        { content: `${dataAlmacen.codigoMedicamento}` },
        { content: `${dataAlmacen.cantidadInicial}` },
        { content: `${dataAlmacen.cantidadInicial - dataAlmacen.cantidad}` },
        { content: `${dataAlmacen.cantidad}` },
        
      ])
      return data;
    });

    this.addTableEmpleadosToPDF(doc, this.tableDataEmpleados);

    doc.save(`reporte-${new Date().toLocaleDateString("en-GB")}.pdf`);
  }



  private addTableEmpleadosToPDF(doc: any, tableData: any[]) {
    doc.autoTable({
      theme: 'grid',
      styles: { lineColor: 50, lineWidth: 0.3, fontSize: 7 },
      head: [[
        { content: "Inventario Almacen", colSpan: 5, styles: { halign: 'center', fillColor: [255, 255, 255], textColor: [0, 0, 0] } }
      ]],
      body: tableData.flat(),
      startY: 60,
    });
  }

}