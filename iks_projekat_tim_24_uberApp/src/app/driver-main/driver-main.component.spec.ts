import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverMainComponent } from './driver-main.component';

describe('DriverMainComponent', () => {
  let component: DriverMainComponent;
  let fixture: ComponentFixture<DriverMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
