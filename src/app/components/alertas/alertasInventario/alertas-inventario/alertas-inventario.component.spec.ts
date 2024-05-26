import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertasInventarioComponent } from './alertas-inventario.component';

describe('AlertasInventarioComponent', () => {
  let component: AlertasInventarioComponent;
  let fixture: ComponentFixture<AlertasInventarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertasInventarioComponent]
    });
    fixture = TestBed.createComponent(AlertasInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
