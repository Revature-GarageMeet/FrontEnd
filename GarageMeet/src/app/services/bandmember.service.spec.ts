import { TestBed } from '@angular/core/testing';

import { BandmemberService } from './bandmember.service';

describe('BandmemberService', () => {
  let service: BandmemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BandmemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
