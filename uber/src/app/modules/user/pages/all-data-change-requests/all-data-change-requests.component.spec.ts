import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDataChangeRequestsComponent } from './all-data-change-requests.component';

describe('AllDataChangeRequestsComponent', () => {
  let component: AllDataChangeRequestsComponent;
  let fixture: ComponentFixture<AllDataChangeRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllDataChangeRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllDataChangeRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
