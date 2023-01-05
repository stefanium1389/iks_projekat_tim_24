import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideHistoryPassengerComponent } from './ride-history-passenger.component';

describe('RideHistoryPassengerComponent', () => {
  let component: RideHistoryPassengerComponent;
  let fixture: ComponentFixture<RideHistoryPassengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideHistoryPassengerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideHistoryPassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
