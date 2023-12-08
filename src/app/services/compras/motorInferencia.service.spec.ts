import { TestBed } from '@angular/core/testing';

import { AlmacenDatosService } from './almacen-datos.service';

describe('AlmacenDatosService', () => {
  let service: AlmacenDatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlmacenDatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
