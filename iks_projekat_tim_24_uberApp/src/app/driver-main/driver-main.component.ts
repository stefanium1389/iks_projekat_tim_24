import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbDatepickerKeyboardService } from '@ng-bootstrap/ng-bootstrap';
import { interval, takeWhile } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtService } from '../components/jwt-service.service';
import { dtoUser } from '../components/search-user-dialog/search-user-dialog.component';

@Component({
  selector: 'app-driver-main',
  templateUrl: './driver-main.component.html',
  styleUrls: ['./driver-main.component.css']
})
export class DriverMainComponent implements OnInit {
  acceptedRide:dtoRide;
  inRide:boolean=false;
  _isActive:boolean=true;
  time:number = 5;
  constructor(private http:HttpClient, private jwtService:JwtService) { }

  ngOnInit(): void {
    interval(5000).subscribe(() => {
      if(!this.acceptedRide){
        this.getAcceptedRide();
      }
  });
  }
  startRide(){
    if(this.acceptedRide){
      const id = this.acceptedRide.id;
      try{
        this.http.put(environment.apiBaseUrl + `api/ride/${id}/start`, {}).toPromise();
        this.inRide=true;
      }
      catch (HttpErrorResponse){
        console.error(HttpErrorResponse);
      }
    }
  }
  stopRide(){
    this.inRide=false;
  }
  hasAcceptedRide():boolean{
    if(this.acceptedRide){
      return true;
    }
    return true;
  }
  panic(){
    alert("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  }
  async getAcceptedRide(){
    const driverId = this.jwtService.getId();
    try{
      const response = await this.http.get(environment.apiBaseUrl + `api/ride/driver/${driverId}/active`).toPromise() as dtoRide;
      this.acceptedRide = response;
      console.log(this.acceptedRide)
    }
    catch (HttpErrorResponse){
      
    }
  }
  isActive(){
    return this._isActive;
  }
  activeButtonClick(){
    this._isActive=!this._isActive;
  }
}
export interface dtoRide{
  id:number;
  startTime:string;
  endTime:string;
  totalCost:number;
  driver:dtoUser;
  passengers:dtoUser[];
  estimatedTimeInMinutes:number;
  vehicleType:string;
  babyTransport:boolean;
  petTransport:boolean;
  locations:dtoLocation[];
  status:string;
}
export interface dtoLocation{
  address:string;
  latitude:number;
  longitude:number;
}
export interface dtoRejection{
  reason:string;
  timeOfRejection:string;
}


