import { TestBed } from '@angular/core/testing';

import { EngineersService } from './engineers.service';

describe('EngineersService', () => {
  let service: EngineersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EngineersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
