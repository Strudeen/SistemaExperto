import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearDatosComponent } from './crear-datos.component';



describe('CrearComponent', () => {
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
