import { TestBed } from '@angular/core/testing';

import { AssetsListService } from './assets-list.service';

describe('AssetsListService', () => {
  let service: AssetsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
