/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NotFailedService } from './notFailed.service';

describe('Service: NotFailed', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotFailedService]
    });
  });

  it('should ...', inject([NotFailedService], (service: NotFailedService) => {
    expect(service).toBeTruthy();
  }));
});
