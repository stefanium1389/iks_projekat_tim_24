import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginDTO } from 'src/app/backend-services/DTO/LoginDTO';
import { UserdataService } from 'src/app/backend-services/userdata.service';
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
  
  constructor(private jwtService: JwtService, private router:Router, private snackBar:MatSnackBar, private userService: UserdataService) { 
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('',Validators.required),
      password: new FormControl('', Validators.required)
    });
    
  }
  login() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    const dto:LoginDTO = {
      email: email,
      password: password
    }
    this.userService.login(dto).subscribe({
      next: (result) => {
        this.jwtService.setJwt(result.accessToken);
        this.jwtService.setRefreshToken(result.refreshToken);

        this.routeUsers();
      },
      error: (error) => {
        const errorMessage = error.error?.message || 'An unknown error occurred';
        this.snackBar.open(errorMessage, 'Ok', {
          duration: 3000
        });
      }
    })    
  }

    

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

