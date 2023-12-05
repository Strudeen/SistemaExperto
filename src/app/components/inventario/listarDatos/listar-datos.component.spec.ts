import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarDatosComponent } from './listar-datos.component';



describe('ListarComponent', () => {
  let component: ListarDatosComponent;
  let fixture: ComponentFixture<ListarDatosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarDatosComponent]
    });
    fixture = TestBed.createComponent(ListarDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
