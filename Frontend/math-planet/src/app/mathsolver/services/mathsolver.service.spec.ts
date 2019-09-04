import { TestBed } from '@angular/core/testing';

import { MathsolverService } from './mathsolver.service';

describe('MathsolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MathsolverService = TestBed.get(MathsolverService);
    expect(service).toBeTruthy();
  });
});
