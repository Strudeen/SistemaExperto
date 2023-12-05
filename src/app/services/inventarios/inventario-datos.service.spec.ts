import { TestBed } from '@angular/core/testing';

import { InventarioDatosService } from './inventario-datos.service';

describe('MedicamentosService', () => {
  let service: InventarioDatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventarioDatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
