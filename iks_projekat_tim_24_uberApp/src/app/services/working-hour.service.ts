import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtService } from '../components/jwt-service.service';
import { environment } from 'src/environments/environment';
import { EventEmitter } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs';


export interface WorkingHourResponse
{
  id:number;
  start:string;
  end:string;
}

export interface ListOfWorkingHours {
  totalCount: number;
  results: Array<WorkingHourResponse>
}

export interface WorkingHourDuration {
  duration: string;
}

@Injectable({
  providedIn: 'root'
})
export class WorkingHourService {
  statusChanged = new EventEmitter<string>();
  errorEmitter = new EventEmitter<string>();

  constructor(private http: HttpClient, private jwtService: JwtService) { }

  //pita da li postoji aktivan wh za datog vozača, ako ima primamo listu od 1 elementa
  initialCheckForWorkingHour()
  { 
    if (localStorage.getItem('userPausedWorkingHour'))
    {
      this.setInactiveInComponent();
      return;
    }
    this.http.get<ListOfWorkingHours>(`${environment.apiBaseUrl}api/driver/${this.jwtService.getId()}/last-active-working-hour`)
        .subscribe(
            response => { this.initialOnResponse(response) },
            error => { this.handleWorkingHourError(error) }
        );
  }

  //ako postoji element u listi onda vozac već jeste aktivan, ako nije pravimo mu wh
  initialOnResponse(response : ListOfWorkingHours)
  {
    if (response.totalCount === 0)
    {
      this.createNewWorkingHour();
    }
    this.setActiveInComponent(); //ovde bi možda trebalo koristiti subscribe
  }

  handleWorkingHourError(error: any) {
    if (error.status === 400) {
        if(error.error.message === "Cannot start shift because you exceeded the 8 hours limit in last 24 hours!") {
            this.errorEmitter.emit('exceeded');
        }
    } else {
        console.log("error creating working hour");
    }
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
            response => { this.setInactiveInComponent() },
            error => { this.handleWorkingHourError(error) }
        );
    
    this.setInactiveInComponent();
  }

  setActiveInComponent() {
    this.statusChanged.emit('active');
  }

  setInactiveInComponent() {
    this.statusChanged.emit('inactive');
  }

  onClickEnd()
  {
    this.http.get<ListOfWorkingHours>(`${environment.apiBaseUrl}api/driver/${this.jwtService.getId()}/last-active-working-hour`)
    .subscribe(
        response => { this.endDrivingWorkingHour(response); this.addPausedToLocal(); },
        error => { this.handleWorkingHourError(error) }
    );
  }


  async onLogout() {
    this.http.get<ListOfWorkingHours>(`${environment.apiBaseUrl}api/driver/${this.jwtService.getId()}/last-active-working-hour`)
      .pipe(catchError(error => {
        alert(error);
        console.log(error);
        return throwError(error);
      }))
      .toPromise()
      .then(response => {
        if (response !== undefined && response !== null) {
          if (response.totalCount === 1)
            this.endDrivingWorkingHour(response);
          this.removePausedFromLocal();
        }
      });
  }


  onClickStart()
  {
    let date = new Date();
    let isoDate = date.toISOString();
    this.http.post(`${environment.apiBaseUrl}api/driver/${this.jwtService.getId()}/working-hour`, {start:isoDate} )
        .subscribe(
            response => { this.setActiveInComponent(); this.removePausedFromLocal()},
            error => { this.handleWorkingHourError(error) }
        );
  }

  removePausedFromLocal()
  {
    if (localStorage.getItem('userPausedWorkingHour'))
    {
      localStorage.removeItem('userPausedWorkingHour');
    }
  }

  addPausedToLocal()
  {
    localStorage.setItem('userPausedWorkingHour','true');
  }

  async getActiveTime() {
    try {
        let duration = await this.http.get<WorkingHourDuration>(`${environment.apiBaseUrl}api/driver/${this.jwtService.getId()}/working-hours-of-last-24h`).toPromise();
        console.log("dobavio sam duration joooj");
        return duration;
        
    } catch (error) {
        console.log(error);
        return;
    }
}


  handleActiveTimeError(error:any)
  {

  }


  
  
}
