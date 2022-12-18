import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideHistoryDetailsComponent } from './ride-history-details.component';

describe('RideHistoryDetailsComponent', () => {
  let component: RideHistoryDetailsComponent;
  let fixture: ComponentFixture<RideHistoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideHistoryDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideHistoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
