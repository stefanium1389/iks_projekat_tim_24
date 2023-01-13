import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtService } from '../components/jwt-service.service';

interface WorkingHourResponse
{
  id:number;
  start:string;
  end:string;
}

interface ListOfWorkingHours {
  totalCount: number;
  results: Array<WorkingHourResponse>
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

  constructor(private http: HttpClient, private jwtService: JwtService) { }

  ngOnInit(): void {

    this.initialCheckForWorkingHour();
    
}

  //pita da li postoji aktivan wh za datog vozača, ako ima primamo listu od 1 elementa
  initialCheckForWorkingHour()
  { 
    if (localStorage.getItem('userPausedWorkingHour'))
    {
      this.endDrivingSession();
      return;
    }
    this.http.get<ListOfWorkingHours>(`${environment.apiBaseUrl}api/driver/${this.jwtService.getId()}/last-active-working-hour`)
        .subscribe(
            response => { this.initialOnResponse(response) },
            error => { this.handleWorkingHourError(error) }
        );
  }

  
  initialOnResponse(response : ListOfWorkingHours)
  {
    if (response.totalCount === 0)
    {
      this.createNewWorkingHour();
    }
    this.activateDrivingSession();
  }

  createNewWorkingHour()
  {
    let date = new Date();
    let isoDate = date.toISOString();
    this.http.post(`${environment.apiBaseUrl}api/driver/${this.jwtService.getId()}/working-hour`, {start:isoDate} )
        .subscribe(
            response => { console.log("kreiran wh") },
            error => { this.handleWorkingHourError(error) }
        );
  }

  activateDrivingSession()
  {
    this.isDriverActive = true;
    this.activityStatus = "aktivan";
    if (localStorage.getItem('userPausedWorkingHour'))
    {
      localStorage.removeItem('userPausedWorkingHour');
    }
  }

  endDrivingSession()
  {
    this.isDriverActive = false;
    this.activityStatus = "neaktivan";
  }

  handleWorkingHourError(error : any)
  {
    console.log("greška kod working hour");
    console.log(error) //lel
  }

  //ovome treba krpljenje xd
  onClickEndDriverHour()
  {
    this.http.get<ListOfWorkingHours>(`${environment.apiBaseUrl}api/driver/${this.jwtService.getId()}/last-active-working-hour`)
        .subscribe(
            response => { this.endDrivingWorkingHour(response) },
            error => { this.handleWorkingHourError(error) }
        );
  }

  endDrivingWorkingHour(list: ListOfWorkingHours)
  {
    let date = new Date();
    let isoDate = date.toISOString();
    if (list.totalCount === 0)
    {
      alert("working hour nije pronadjen!!"); //zameniti sa exception-om
    }

    this.http.put(`${environment.apiBaseUrl}api/driver/working-hour/${list.results[0].id}`, {end:isoDate})
        .subscribe(
            response => { this.endDrivingSession() },
            error => { this.handleWorkingHourError(error) }
        );
    //ovako govorimo sajtu da ne pravi novi wh pri refreshu
    localStorage.setItem('userPausedWorkingHour','true');
    this.endDrivingSession();
  }

  onClickStartDriverHour()
  {
    let date = new Date();
    let isoDate = date.toISOString();
    this.http.post(`${environment.apiBaseUrl}api/driver/${this.jwtService.getId()}/working-hour`, {start:isoDate} )
        .subscribe(
            response => { this.activateDrivingSession() },
            error => { this.handleWorkingHourError(error) }
        );
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
