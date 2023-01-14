import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {



  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  isExpired: boolean;
  success:boolean;
  message:string;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let token = params['token'];
      this.activate(token);
    });
  }

  async activate(token:string) {
    try {
    
    const response = await this.http.get(environment.apiBaseUrl+'api/passenger/activate/'+token).toPromise() as MessageDTO;
    this.success = true;
    this.message = response.message;
    }
    catch (error) {
      if (error instanceof HttpErrorResponse) {
          this.success=false;
          this.message = error.error.message;
          if(this.message.toLowerCase().includes('istekla')){
            this.isExpired=true;
          }
      } else {
          this.success=false;
          this.message="An error occurred, please try again later.";
      }
    }
  }
  async resendEmail() {
    this.route.queryParams.subscribe(async params => {
      let token = params['token'];    
    try {
      
      const response = await this.http.get(environment.apiBaseUrl+'api/passenger/activate/resend/'+token).toPromise() as MessageDTO;
      this.success = true;
      this.message = response.message;
      this.isExpired = false;
      }
      catch (error) {
        if (error instanceof HttpErrorResponse) {
            this.success=false;
            this.message = error.error.message;
            if(error.error.status == 400){
              this.isExpired=true;
            }
        } else {
            this.success=false;
            this.message="An error occurred, please try again later.";
        }
      }
    });
    }
  }
export interface MessageDTO{
  message:string;
}

