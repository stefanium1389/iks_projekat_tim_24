import { Component, OnInit } from '@angular/core';
import { DriverService } from '../services/driver.service';

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

  constructor(private driverService: DriverService) { }

  ngOnInit(): void 
  {
    this.driverService.statusChanged.subscribe(status => {
      this.handleStatusChange(status);
    });
    this.driverService.initialCheckForWorkingHour();
  }

  handleStatusChange(status: string) {
    if (status === 'active') {
        this.activateDrivingSession();
    } else if (status === 'inactive') {
        this.endDrivingSession();
    }
  }

  activateDrivingSession()
  {
    this.isDriverActive = true;
    this.activityStatus = "aktivan";
  }

  endDrivingSession()
  {
    this.isDriverActive = false;
    this.activityStatus = "neaktivan";
  }

  //ovome treba krpljenje xd
  onClickEndDriverHour()
  {
    this.driverService.onClickEnd();
  }

  onClickStartDriverHour()
  {
    this.driverService.onClickStart();
  }

  panic(){
    alert("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  }

  startRide(){
    this.inRide=true;
  }

  stopRide(){
    this.inRide=false;
  }

}
