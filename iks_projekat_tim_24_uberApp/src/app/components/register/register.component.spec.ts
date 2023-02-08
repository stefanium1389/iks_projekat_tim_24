import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterComponent } from './register.component';
import { OverlayModule } from '@angular/cdk/overlay';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let snackBarSpy;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        RouterTestingModule,
        OverlayModule
      ],
      declarations: [ RegisterComponent ],
      providers: [MatSnackBar, OverlayModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    snackBarSpy = spyOn(TestBed.get(MatSnackBar), 'open');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid', () => {
    component.registerForm.controls['email'].setValue('');
    component.registerForm.controls['password'].setValue('');
    component.registerForm.controls['repeatPassword'].setValue('');
    component.registerForm.controls['name'].setValue('');
    component.registerForm.controls['surname'].setValue('');
    component.registerForm.controls['phone'].setValue('');
    component.registerForm.controls['address'].setValue('');
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('form should be valid', () => {
    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('password');
    component.registerForm.controls['repeatPassword'].setValue('password');
    component.registerForm.controls['name'].setValue('test');
    component.registerForm.controls['surname'].setValue('test');
    component.registerForm.controls['phone'].setValue('1234567890');
    component.registerForm.controls['address'].setValue('address');
    expect(component.registerForm.valid).toBeTruthy();
  });
})