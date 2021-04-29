import { TestBed } from '@angular/core/testing';

import { RadiobrowserService } from './radiobrowser.service';

describe('RadiobrowserService', () => {
  let service: RadiobrowserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RadiobrowserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
