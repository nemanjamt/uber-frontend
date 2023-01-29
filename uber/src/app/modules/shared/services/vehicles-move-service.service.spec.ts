import { TestBed } from '@angular/core/testing';

import { VehiclesMoveServiceService } from './vehicles-move-service.service';

describe('VehiclesMoveServiceService', () => {
  let service: VehiclesMoveServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiclesMoveServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
