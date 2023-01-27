import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverProfileForAdminComponent } from './driver-profile-for-admin.component';

describe('DriverProfileForAdminComponent', () => {
  let component: DriverProfileForAdminComponent;
  let fixture: ComponentFixture<DriverProfileForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverProfileForAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverProfileForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
