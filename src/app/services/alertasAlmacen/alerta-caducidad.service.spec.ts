import { TestBed } from '@angular/core/testing';

import { AlertaCaducidadService } from './alerta-caducidad.service';

describe('AlertaCaducidadService', () => {
  let service: AlertaCaducidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertaCaducidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
