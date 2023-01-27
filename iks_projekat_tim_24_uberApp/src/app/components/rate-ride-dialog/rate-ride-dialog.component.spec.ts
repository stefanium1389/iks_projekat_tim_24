import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateRideDialogComponent } from './rate-ride-dialog.component';

describe('RateRideDialogComponent', () => {
  let component: RateRideDialogComponent;
  let fixture: ComponentFixture<RateRideDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateRideDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateRideDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
