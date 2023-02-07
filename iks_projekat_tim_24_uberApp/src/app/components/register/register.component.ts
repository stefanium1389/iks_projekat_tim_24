import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControlOptions, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DefaultDataPoint } from 'chart.js';
import { UserDTO } from 'src/app/backend-services/DTO/UserDTO';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit
{
  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) { }

  registerForm: FormGroup;


  ngOnInit(): void
  {
    this.registerForm = new FormGroup({

      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      repeatPassword: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required)}
      , { validators: matchPasswords }
    );
  }

  async register(){
    if(this.registerForm.invalid){
      this.snackBar.open('Popunite formu!', 'Ok', {
        duration: 3000
      });
      return;
    }
    try{
    const dto = {
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      name: this.registerForm.get('name')?.value,
      surname: this.registerForm.get('surname')?.value,
      phone: this.registerForm.get('phone')?.value,
      address: this.registerForm.get('address')?.value,
      profilePicture: null
    } as RegistrationDTO

    const response = await this.http.post(environment.apiBaseUrl+'api/passenger', dto).toPromise() as UserDTO;
    this.router.navigate(['register-success']);


  }
    catch (error) {
      if (error instanceof HttpErrorResponse) {
        this.snackBar.open(error.error.message, 'Ok', {
          duration: 3000
        });
      }  
    }
  }
}

export function matchPasswords(control: AbstractControl) {
  const password = control.get('password');
  const confirmPassword = control.get('repeatPassword');
  if (password?.value !== confirmPassword?.value) {
    return { notSame: true };
  }
  return null;
}

export interface RegistrationDTO{
  email:string;
  password:string;
  name:string;
  surname:string;
  phone:string;
  address:string;
  profilePicture:string | null;
}
