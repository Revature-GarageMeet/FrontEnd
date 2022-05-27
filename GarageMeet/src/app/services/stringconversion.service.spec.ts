import { TestBed } from '@angular/core/testing';

import { StringconversionService } from './stringconversion.service';

describe('StringconversionService', () => {
  let service: StringconversionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StringconversionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
