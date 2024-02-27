import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userinfoGuard } from './userinfo.guard';

describe('userinfoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userinfoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
