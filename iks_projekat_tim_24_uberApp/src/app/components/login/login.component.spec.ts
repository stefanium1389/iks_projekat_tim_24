import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { JwtService } from '../jwt-service.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule, HttpTestingController } from  '@angular/common/http/testing';
import { LoginDTO } from 'src/app/backend-services/DTO/LoginDTO';
import { ErrorDTO } from 'src/app/backend-services/DTO/SuccessDTO';
import { UserdataService } from 'src/app/backend-services/userdata.service';
import { Observable, of, throwError } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let jwtServiceSpy: any;
  let routerSpy:any;
  let userServiceSpy:any;
  let httpMock: HttpTestingController;
  let snackBarSpy: any;

  beforeEach(() => {

    jwtServiceSpy = jasmine.createSpyObj<JwtService>(['getRole','setJwt','setRefreshToken']);
    routerSpy = jasmine.createSpyObj<Router>(['navigate']);
    userServiceSpy = jasmine.createSpyObj<UserdataService>(['login']);
    snackBarSpy = jasmine.createSpyObj<MatSnackBar>(['open']);
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        MatSnackBarModule,
        HttpClientTestingModule,
        NoopAnimationsModule
        ],
      declarations: [LoginComponent],
      providers: [
        {provide: MatSnackBar, useValue: snackBarSpy},
        {provide: UserdataService, useValue: userServiceSpy},
        {provide: JwtService, useValue: jwtServiceSpy},
        {provide: Router, useValue: routerSpy }]
    })
      .compileComponents();
      fixture = TestBed.createComponent(LoginComponent);
      httpMock = TestBed.inject(HttpTestingController);
      component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
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

  it('should call set Jwt, refreshToken and routeUsers if response from UserService.login() is successful', () => {
    const email = 'test@example.com';
    const password = 'password';
    component.loginForm.controls['email'].setValue(email);
    component.loginForm.controls['password'].setValue(password);
    
    const dto: LoginDTO = { email, password };
    userServiceSpy.login.and.returnValue(of({ accessToken: 'accessToken', refreshToken: 'refreshToken' }));

    spyOn(component, 'routeUsers');

    component.login();

    expect(userServiceSpy.login).toHaveBeenCalledWith(dto);
    expect(jwtServiceSpy.setJwt).toHaveBeenCalledWith('accessToken');
    expect(jwtServiceSpy.setRefreshToken).toHaveBeenCalledWith('refreshToken');
    expect(component.routeUsers).toHaveBeenCalled();
  });

  it('should call MatSnackBar.open() if response from UserService.login() is unsuccessful', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password');
  
    const errorMessage = 'Bad credentials';
    
    userServiceSpy.login.and.returnValue(throwError({ error: { message: errorMessage } }));
    
    component.login();
  
    expect(snackBarSpy.open).toHaveBeenCalledWith(errorMessage, 'Ok', { duration: 3000 });
  });
  
});

