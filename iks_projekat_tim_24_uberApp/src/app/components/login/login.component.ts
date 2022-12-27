import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, RequiredValidator } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { User } from 'src/app/user';
import { UserService } from 'src/app/user.service';
import { environment } from 'src/environments/environment';
import { JwtService } from '../jwt-service.service';
import { loginResponse } from './loginResponse';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  
  constructor(private http: HttpClient, private jwtSetvice: JwtService, private router:Router, private userService:UserService) { 
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('',Validators.required),
      password: new FormControl('', Validators.required)
    });
    
  }
  async login() {
    try {
      const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    
    const response = await this.http.post(environment.apiBaseUrl+'api/user/login', {email:email, password:password}).toPromise() as loginResponse;
    this.jwtSetvice.setJwt(response.accessToken);
    console.log(this.jwtSetvice.getEmail());
    this.router.navigate(['/']);

    }
    catch (HttpErrorResponse){
      console.error(HttpErrorResponse);
    }
  };
  
}

