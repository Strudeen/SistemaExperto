import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitucionEditarComponent } from './institucion-editar.component';

describe('InstitucionEditarComponent', () => {
  let component: InstitucionEditarComponent;
  let fixture: ComponentFixture<InstitucionEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstitucionEditarComponent]
    });
    fixture = TestBed.createComponent(InstitucionEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
