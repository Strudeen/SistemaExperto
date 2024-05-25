import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertasAlmacenComponent } from './alertas-almacen.component';

describe('AlertasAlmacenComponent', () => {
  let component: AlertasAlmacenComponent;
  let fixture: ComponentFixture<AlertasAlmacenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertasAlmacenComponent]
    });
    fixture = TestBed.createComponent(AlertasAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
