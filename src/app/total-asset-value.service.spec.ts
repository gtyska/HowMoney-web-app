import { TestBed } from '@angular/core/testing';

import { TotalAssetValueService } from './total-asset-value.service';

describe('TotalAssetValueService', () => {
  let service: TotalAssetValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalAssetValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
