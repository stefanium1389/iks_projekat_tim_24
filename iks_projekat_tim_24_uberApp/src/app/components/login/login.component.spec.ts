import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtService } from '../jwt-service.service';
import { Router } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        MatSnackBarModule
        ],
      declarations: [LoginComponent],
      providers: [JwtService, { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('email field validity', () => {
    let email = component.loginForm.controls['email'];
    expect(email.valid).toBeFalsy();

    // Email field is required
    let errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something correct
    email.setValue("test@test.com");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(email.valid).toBeTruthy();
  });

  it('password field validity', () => {
    let password = component.loginForm.controls['password'];
    expect(password.valid).toBeFalsy();

    // Password field is required
    let errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set password to something correct
    password.setValue("password");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(password.valid).toBeTruthy();
  });
});
