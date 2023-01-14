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
      } else {
          this.success=false;
          this.message="An error occurred, please try again later.";
      }
    }
  }
}
export interface MessageDTO{
  message:string;
}

