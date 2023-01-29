import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideHistoryMapComponent } from './ride-history-map.component';

describe('RideHistoryMapComponent', () => {
  let component: RideHistoryMapComponent;
  let fixture: ComponentFixture<RideHistoryMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideHistoryMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideHistoryMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
