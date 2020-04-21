import { TestBed } from '@angular/core/testing';

import { UserNameServiceService } from './user-name-service.service';

describe('UserNameServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserNameServiceService = TestBed.get(UserNameServiceService);
    expect(service).toBeTruthy();
  });
});
