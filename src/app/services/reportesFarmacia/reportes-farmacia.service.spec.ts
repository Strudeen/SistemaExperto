import { TestBed } from '@angular/core/testing';

import { ReportesFarmaciaService } from './reportes-farmacia.service';

describe('ReportesFarmaciaService', () => {
  let service: ReportesFarmaciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportesFarmaciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
