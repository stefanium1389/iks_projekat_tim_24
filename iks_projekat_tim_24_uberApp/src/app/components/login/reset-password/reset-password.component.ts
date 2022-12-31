import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private router: Router) { }

  emailForm : FormGroup;
  emailSent: boolean = false;
  hasToken: boolean = true;

  ngOnInit(): void {
    this.emailForm = new FormGroup({
      email: new FormControl('',Validators.required)
    });
  };

  sendReset(){

    if(this.emailForm.get('email')?.value){
      this.emailSent = true;
    }
  };
  
  backToLogin(){
    
    this.router.navigate(['..']);

  };
  confirmReset(){
    
  }

}
