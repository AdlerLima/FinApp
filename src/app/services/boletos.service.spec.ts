import { TestBed } from '@angular/core/testing';

import { BoletosService } from './boletos.service';

describe('BoletosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoletosService = TestBed.get(BoletosService);
    expect(service).toBeTruthy();
  });
});
