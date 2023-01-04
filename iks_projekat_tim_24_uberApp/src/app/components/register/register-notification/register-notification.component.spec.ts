import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNotificationComponent } from './register-notification.component';

describe('RegisterComponent', () => {
  let component: RegisterNotificationComponent;
  let fixture: ComponentFixture<RegisterNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterNotificationComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
