import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, RequiredValidator } from '@angular/forms';
import { Router } from '@angular/router';
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
  
  constructor(private http: HttpClient, private jwtService: JwtService, private router:Router, private userService:UserService) { 
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
    this.jwtService.setJwt(response.accessToken);

    this.routeUsers();

    }
    catch (HttpErrorResponse){
      console.error(HttpErrorResponse);
    }
  };

  routeUsers()
  {
    let role = this.jwtService.getRole();

    if (role === "DRIVER")
    {
      this.router.navigate(['/driver-home']);
    }
    else if(role === "ADMIN")
    {
      this.router.navigate(['/admin-home'])
    }
    else if (role === "USER")
    {
      this.router.navigate(['/user-home'])
    }
  }
  
}

