import { TestBed } from '@angular/core/testing';

import { AlertsListService } from './alerts-list.service';

describe('AlertsListService', () => {
  let service: AlertsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
