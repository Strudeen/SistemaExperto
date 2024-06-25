import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Institucion } from 'src/app/models/institucion';
import { InstitucionService } from 'src/app/services/institucion/institucion.service';

@Component({
  selector: 'app-institucion',
  templateUrl: './institucion.component.html',
  styleUrls: ['./institucion.component.css']
})
export class InstitucionComponent  implements OnInit {
  institucion: Institucion | null = null;

  constructor(
    private route: ActivatedRoute,
    private institucionService: InstitucionService,
    private router: Router // Agregar el router aquí
  ) {}

  ngOnInit(): void {
    // Obteniendo el ID de la institución desde la URL
    const id = this.route.snapshot.paramMap.get('id') || "666b7a7c668f4890e555863b"; // ID de la institución
    this.loadInstitucionData(id);
  }

  loadInstitucionData(id: string): void {
    this.institucionService.getInst(id).subscribe(
      (data: Institucion) => {
        console.log('Datos recibidos:', data); // Verifica los datos recibidos
        this.institucion = data;
      },
      error => {
        console.error('Error al cargar los datos de la institución:', error);
      }
    );
  }
  editInstitucion(): void {
    if (this.institucion) {
      this.router.navigate(['/institucion/institucion-editar/666b7a7c668f4890e555863b']);
    }
  }
  
}
