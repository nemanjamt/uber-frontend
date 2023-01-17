import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverDataChangeRequestComponent } from './driver-data-change-request.component';

describe('DriverDataChangeRequestComponent', () => {
  let component: DriverDataChangeRequestComponent;
  let fixture: ComponentFixture<DriverDataChangeRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverDataChangeRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverDataChangeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
