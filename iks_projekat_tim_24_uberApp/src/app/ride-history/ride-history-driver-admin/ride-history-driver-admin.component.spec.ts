import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideHistoryDriverAdminComponent } from './ride-history-driver-admin.component';

describe('RideHistoryDriverAdminComponent', () => {
  let component: RideHistoryDriverAdminComponent;
  let fixture: ComponentFixture<RideHistoryDriverAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideHistoryDriverAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideHistoryDriverAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
