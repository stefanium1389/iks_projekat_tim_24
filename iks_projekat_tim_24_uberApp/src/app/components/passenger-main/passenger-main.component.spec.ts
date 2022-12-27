import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerMainComponent } from './passenger-main.component';

describe('PassengerMainComponent', () => {
  let component: PassengerMainComponent;
  let fixture: ComponentFixture<PassengerMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
