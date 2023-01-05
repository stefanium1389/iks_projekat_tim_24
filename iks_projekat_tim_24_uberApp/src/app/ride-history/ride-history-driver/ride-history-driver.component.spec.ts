import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideHistoryDriverComponent } from './ride-history-driver.component';

describe('RideHistoryDriverComponent', () => {
  let component: RideHistoryDriverComponent;
  let fixture: ComponentFixture<RideHistoryDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideHistoryDriverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideHistoryDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
