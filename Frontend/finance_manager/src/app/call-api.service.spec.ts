import { TestBed } from '@angular/core/testing';

import { CallAPIService } from './call-api.service';

describe('CallAPIService', () => {
  let service: CallAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
