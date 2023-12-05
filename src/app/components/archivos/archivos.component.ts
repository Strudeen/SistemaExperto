import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AlmacenService } from 'src/app/services/almacenes/almacen.service';
import { createWorker } from 'tesseract.js';

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css']
})
export class ArchivosComponent {
    fileName = '';
  image = "";
  texto = "";
  formData = new FormData();

  constructor(private http: HttpClient, private almacenService: AlmacenService) { }

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      this.formData.append("file", file);
      console.log(this.formData.get("file"));
    }
  }
  onFileSaved() {
    const upload$ = this.http.post("http://localhost:3000/api/file/upload", this.formData);

    upload$.subscribe(async (m: any) => {
      console.log(m)
      this.image = "http://localhost:3000/api/file/" + m.file.id;
      await this.ocrTest(this.image);
    });
  }

  async ocrTest(url: string) {
    const worker = await createWorker('spa');
    const { data: { text } }: any = await worker.recognize(url);
    console.log(text);
    this.almacenService.postOCR(text).subscribe(m =>{
      console.log(m);
    })
    this.texto = text;
    await worker.terminate();
  
  }
}