import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerProfileAdminComponent } from './passenger-profile-admin.component';

describe('PassengerProfileAdminComponent', () => {
  let component: PassengerProfileAdminComponent;
  let fixture: ComponentFixture<PassengerProfileAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerProfileAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerProfileAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
