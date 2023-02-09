import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { JwtService } from '../jwt-service.service';
import { Router } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let jwtServiceSpy: any;
  let routerSpy:any;
  let httpSpy:any;

  beforeEach(() => {

    jwtServiceSpy = jasmine.createSpyObj<JwtService>(['getRole','setJwt','setRefreshToken']);
    routerSpy = jasmine.createSpyObj<Router>(['navigate']);
    httpSpy = jasmine.createSpyObj<HttpClient>(['post']);
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        MatSnackBarModule
        ],
      declarations: [LoginComponent],
      providers: [
        {provide: HttpClient, useValue: httpSpy},
        {provide: JwtService, useValue: jwtServiceSpy},
        { provide: Router, useValue: routerSpy }]
    })
      .compileComponents();
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
  
  it('should route to driver-home when role is DRIVER', () => {
    jwtServiceSpy.getRole.and.returnValue('DRIVER');
    
    component.routeUsers();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/driver-home']);
  });

  it('should route to user-home when role is USER', () => {
    jwtServiceSpy.getRole.and.returnValue('USER');
    
    component.routeUsers();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/user-home']);
  });

  it('should route to admin-home when role is ADMIN', () => {
    jwtServiceSpy.getRole.and.returnValue('ADMIN');
    
    component.routeUsers();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/admin-home']);
  });

  it('should call http post when login', ()=>{
    component.login();
    expect(httpSpy.post).toHaveBeenCalled();

  });

});

