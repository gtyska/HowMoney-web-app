import { TestBed } from '@angular/core/testing';

import { UserAssetService } from './user-asset.service';

describe('UserAssetService', () => {
  let service: UserAssetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAssetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
