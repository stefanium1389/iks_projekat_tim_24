import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtService } from '../components/jwt-service.service';

export interface WorkingHourResponse
{
  id:number;
  start:string;
  end:string;
}

@Component({
  selector: 'app-driver-main',
  templateUrl: './driver-main.component.html',
  styleUrls: ['./driver-main.component.css']
})
export class DriverMainComponent implements OnInit {

  activityStatus="";
  workHours="";
  isDriverActive:boolean;
  inRide:boolean;
  lastWorkingHour: WorkingHourResponse;

  constructor(private http: HttpClient, private jwtService: JwtService) { }

  ngOnInit(): void {

    this.initialDrivingSession();
    
}

  initialDrivingSession()
  {
    //pošto se stranica stalno refreshuje zbog mape treba ovde napraviti da proba da 
    //pronadje prvilogin objekat koji bi login ostavio i samo ako njega nađe da potera ovo
    let date = new Date();
    let isoDate = date.toISOString();
    this.http.post(`${environment.apiBaseUrl}api/driver/${this.jwtService.getId()}/working-hour`, {start:isoDate} )
        .subscribe(
            response => { this.activateDrivingSession(response as WorkingHourResponse) },
            error => { this.handleWorkingHourError(error) }
        );
  }

  startRide(){
    this.inRide=true;
  }

  stopRide(){
    this.inRide=false;
  }

  activateDrivingSession(response : WorkingHourResponse)
  {
    this.lastWorkingHour = response;
    this.isDriverActive = true;
    this.activityStatus = "aktivan";
  }

  endDrivingSession(response : WorkingHourResponse)
  {
    this.lastWorkingHour = response;
    this.isDriverActive = false;
    this.activityStatus = "neaktivan";
  }

  handleWorkingHourError(error : any)
  {
    console.log("greška kod working hour");
    console.log(error) //lel
  }

  onClickEndDriverHour()
  {
    let date = new Date();
    let isoDate = date.toISOString();
    this.http.put(`${environment.apiBaseUrl}api/driver/working-hour/${this.lastWorkingHour.id}`, {end:isoDate})
        .subscribe(
            response => { this.endDrivingSession(response as WorkingHourResponse) },
            error => { this.handleWorkingHourError(error) }
        );
  }

  onClickStartDriverHour()
  {

  }

  panic(){
    alert("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  }

}
