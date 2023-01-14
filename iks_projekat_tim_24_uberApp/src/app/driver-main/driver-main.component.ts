import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  isWorkingHourButtonDisabled:boolean;

  constructor(private whService: WorkingHourService) { }

  ngOnInit(): void 
  {
    this.whService.statusChanged.subscribe(status => {
      this.handleStatusChange(status);
    });

    this.whService.errorEmitter.subscribe(status => {
      this.handleError(status);
    });

    this.whService.initialCheckForWorkingHour();
    this.getAndSetActiveHours();
  }

  handleStatusChange(status: string) {
    if (status === 'active') {
        this.activateDrivingSession();
    } else if (status === 'inactive') {
        this.endDrivingSession();
    }
  }

  handleError(status: string) {
    if (status === 'exceeded') {
        this.hoursExceeded();
    } else if (status === 'revert') {
        this.revertExceeded();
    }else
    {
      alert(status);
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

  hoursExceeded()
  {
    this.isDriverActive = false;
    this.activityStatus = "premašeno je 8h rada!"
    this.isWorkingHourButtonDisabled = true;

  }

  async getAndSetActiveHours() {
    try {
        const duration = await this.whService.getActiveTime();
        if (duration)
        {
          this.workHours = duration.duration;
        }
        
    } catch (error) {
        alert(error);
    }
}


  revertExceeded()
  {
    //za sad nemamo ovo, refreshujte xd
  }

  //ovome treba krpljenje xd
  onClickEndDriverHour()
  {
    this.whService.onClickEnd();
    this.getAndSetActiveHours();
  }

  onClickStartDriverHour()
  {
    this.whService.onClickStart();
    this.getAndSetActiveHours();
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
