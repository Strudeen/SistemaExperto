import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDatosComponent } from './crearDatos.component';

describe('CrearDatosComponent', () => {
  let component: CrearDatosComponent;
  let fixture: ComponentFixture<CrearDatosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearDatosComponent]
    });
    fixture = TestBed.createComponent(CrearDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
