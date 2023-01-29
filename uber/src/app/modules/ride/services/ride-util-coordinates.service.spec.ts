import { TestBed } from '@angular/core/testing';

import { RideUtilCoordinatesService } from './ride-util-coordinates.service';

describe('RideUtilCoordinatesService', () => {
  let service: RideUtilCoordinatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RideUtilCoordinatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
