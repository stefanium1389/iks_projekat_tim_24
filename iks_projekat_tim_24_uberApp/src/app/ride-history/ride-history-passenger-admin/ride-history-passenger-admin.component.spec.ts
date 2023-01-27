import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideHistoryPassengerAdminComponent } from './ride-history-passenger-admin.component';

describe('RideHistoryPassengerAdminComponent', () => {
  let component: RideHistoryPassengerAdminComponent;
  let fixture: ComponentFixture<RideHistoryPassengerAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideHistoryPassengerAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideHistoryPassengerAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
