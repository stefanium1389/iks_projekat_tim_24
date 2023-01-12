import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtService } from '../components/jwt-service.service';

@Component({
  selector: 'app-driver-main',
  templateUrl: './driver-main.component.html',
  styleUrls: ['./driver-main.component.css']
})
export class DriverMainComponent implements OnInit {

  activityStatus="";
  workHours="";
  inRide:boolean;

  constructor(private http: HttpClient, private jwtService: JwtService) { }

  ngOnInit(): void {
    let date = new Date();
    let isoDate = date.toISOString();
    this.http.post(`${environment.apiBaseUrl}api/driver/${this.jwtService.getId()}/working-hour`, {start:isoDate})
        .subscribe(
            response => { this.activateDrivingSession() },
            error => { this.handleWorkingHourError() }
        );
}

  startRide(){
    this.inRide=true;
  }

  stopRide(){
    this.inRide=false;
  }

  activateDrivingSession()
  {
    this.activityStatus = "aktivan";
  }

  handleWorkingHourError()
  {
    console.log("greška kod pravljenja working hour");
  }

  panic(){
    alert("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  }
  
}
