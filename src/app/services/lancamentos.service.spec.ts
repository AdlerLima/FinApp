import { TestBed } from '@angular/core/testing';

import { LancamentosService } from './lancamentos.service';

describe('LancamentosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LancamentosService = TestBed.get(LancamentosService);
    expect(service).toBeTruthy();
  });
});
