import { TestBed } from '@angular/core/testing';

import { RestcountriesService } from './restcountries.service';

describe('RestcountriesService', () => {
  let service: RestcountriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestcountriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
