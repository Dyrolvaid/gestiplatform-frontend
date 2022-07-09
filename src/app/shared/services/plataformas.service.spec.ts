import { TestBed } from '@angular/core/testing';

import { PlataformasService } from './plataformas.service';

describe('PlataformasService', () => {
  let service: PlataformasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlataformasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
