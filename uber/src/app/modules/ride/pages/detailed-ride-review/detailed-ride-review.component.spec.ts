import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedRideReviewComponent } from './detailed-ride-review.component';

describe('DetailedRideReviewComponent', () => {
  let component: DetailedRideReviewComponent;
  let fixture: ComponentFixture<DetailedRideReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedRideReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedRideReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
