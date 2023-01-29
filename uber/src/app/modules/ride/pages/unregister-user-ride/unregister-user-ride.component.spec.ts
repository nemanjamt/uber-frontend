import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisterUserRideComponent } from './unregister-user-ride.component';

describe('UnregisterUserRideComponent', () => {
  let component: UnregisterUserRideComponent;
  let fixture: ComponentFixture<UnregisterUserRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnregisterUserRideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnregisterUserRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
