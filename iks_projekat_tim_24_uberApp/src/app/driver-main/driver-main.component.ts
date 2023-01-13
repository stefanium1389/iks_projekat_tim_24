import { Component, OnInit } from '@angular/core';
import { WorkingHourService } from '../services/working-hour.service';

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

  constructor(private whService: WorkingHourService) { }

  ngOnInit(): void 
  {
    this.whService.statusChanged.subscribe(status => {
      this.handleStatusChange(status);
    });
    this.whService.initialCheckForWorkingHour();
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
    this.whService.onClickEnd();
  }

  onClickStartDriverHour()
  {
    this.whService.onClickStart();
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
