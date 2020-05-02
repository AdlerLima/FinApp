import { TestBed } from '@angular/core/testing';

import { FormularioService } from './formulario.service';

describe('FormularioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormularioService = TestBed.get(FormularioService);
    expect(service).toBeTruthy();
  });
});
