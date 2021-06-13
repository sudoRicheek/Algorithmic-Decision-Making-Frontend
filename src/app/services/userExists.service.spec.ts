/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserExistsService } from './userExists.service';

describe('Service: UserExists', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserExistsService]
    });
  });

  it('should ...', inject([UserExistsService], (service: UserExistsService) => {
    expect(service).toBeTruthy();
  }));
});
