import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUserDataComponent } from './form-user-data.component';

describe('FormUserDataComponent', () => {
  let component: FormUserDataComponent;
  let fixture: ComponentFixture<FormUserDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUserDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormUserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
