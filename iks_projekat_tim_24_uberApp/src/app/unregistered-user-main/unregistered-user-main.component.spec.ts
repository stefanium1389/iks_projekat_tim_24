import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisteredUserMainComponent } from './unregistered-user-main.component';

describe('UnregisteredUserMainComponent', () => {
  let component: UnregisteredUserMainComponent;
  let fixture: ComponentFixture<UnregisteredUserMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnregisteredUserMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnregisteredUserMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
