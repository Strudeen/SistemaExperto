import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Institucion } from 'src/app/models/institucion';
import { InstitucionService } from 'src/app/services/institucion/institucion.service';

@Component({
  selector: 'app-institucion-editar',
  templateUrl: './institucion-editar.component.html',
  styleUrls: ['./institucion-editar.component.css']
})
export class InstitucionEditarComponent implements OnInit {
  editInstitucionForm!: FormGroup;
  institucion!: Institucion | null;

  constructor(
    private fb: FormBuilder,
    private institucionService: InstitucionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadInstitucionData();
  }

  createForm(): void {
    this.editInstitucionForm = this.fb.group({
      institucionNombre: ['', Validators.required],
      institucionPrincipal: ['', Validators.required],
      institucionDetalles: ['', Validators.required],
      institucionDescripcion: ['', Validators.required],
      institucionDireccion: ['', Validators.required],
      institucionNit: ['', Validators.required],
      institucionEmail: ['', [Validators.required, Validators.email]],
      institucionFax: ['', Validators.required],
      institucionTelefono: ['', Validators.required],
      institucionCelular: ['', Validators.required]
    });
  }

  loadInstitucionData(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.institucionService.getInst(id).subscribe((data: Institucion) => {
        this.institucion = data;
        this.editInstitucionForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.editInstitucionForm.valid) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.institucionService.putInstitucion(id, this.editInstitucionForm.value).subscribe(
          response => {
            console.log('Institución actualizada', response);
            this.router.navigate(['/institucion', id]); // Redirige a los detalles de la institución después de guardar
          },
          error => {
            console.error('Error al actualizar la institución', error);
          }
        );
      }
    }
  }
}
