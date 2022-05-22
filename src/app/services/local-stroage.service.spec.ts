/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LocalStroageService } from './local-stroage.service';

describe('Service: LocalStroage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStroageService]
    });
  });

  it('should ...', inject([LocalStroageService], (service: LocalStroageService) => {
    expect(service).toBeTruthy();
  }));
});
