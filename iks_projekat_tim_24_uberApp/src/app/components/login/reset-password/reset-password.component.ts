import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserdataService } from 'src/app/backend-services/userdata.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private router: Router, private users:UserdataService, private route:ActivatedRoute) { }

  emailForm : FormGroup;
  passwordForm: FormGroup;
  emailSent: boolean = false;
  hasToken: boolean = false;
  token:string;


  ngOnInit(): void {
    this.emailForm = new FormGroup({
      email: new FormControl('',Validators.required)
    });
    this.passwordForm = new FormGroup({
      password: new FormControl('',Validators.required)
    })
    this.route.queryParams.subscribe(params => {
      let token = params['token'];
      this.token = token;
      if(this.token) {this.hasToken = true;}
    });
  };

  sendReset(){

    if(this.emailForm.get('email')?.value){
      this.users.sendPasswordResetEmail({email:this.emailForm.get('email')?.value}).subscribe({
        next: (result) => {
          this.emailSent = true;
        }
      })
    }
  };
  
  backToLogin(){
    
    this.router.navigate(['..']);

  };
  confirmReset(){
    if(this.passwordForm.get('password')?.value){
      this.users.checkResetPassword({newPassword:this.passwordForm.get('password')?.value, code:this.token}).subscribe({
        next: (result) => {
          console.log(result);
          this.backToLogin();
        }
      })
    }
  }

}
