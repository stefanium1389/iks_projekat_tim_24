import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtService } from '../components/jwt-service.service';
import { environment } from 'src/environments/environment';
import { EventEmitter } from '@angular/core';


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

@Injectable({
  providedIn: 'root'
})
export class WorkingHourService {
  statusChanged = new EventEmitter<string>();

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

  handleWorkingHourError(error : any)
  {
    console.log("greška kod working hour");
    console.log(error) //troll opera
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
        response => { this.endDrivingWorkingHour(response); this.addToLocal(); },
        error => { this.handleWorkingHourError(error) }
    );
  }

  //ista stvar ali se ne upisuje u local storage
  async onLogout() {
    const response = await this.http.get<ListOfWorkingHours>(`${environment.apiBaseUrl}api/driver/${this.jwtService.getId()}/last-active-working-hour`).toPromise();
    if (response !== undefined && response !== null) {
      if (response.totalCount === 1)
      this.endDrivingWorkingHour(response);
    }
  }
  
  
  

  onClickStart()
  {
    let date = new Date();
    let isoDate = date.toISOString();
    this.http.post(`${environment.apiBaseUrl}api/driver/${this.jwtService.getId()}/working-hour`, {start:isoDate} )
        .subscribe(
            response => { this.setActiveInComponent(); this.removeFromLocal()},
            error => { this.handleWorkingHourError(error) }
        );
  }

  removeFromLocal()
  {
    if (localStorage.getItem('userPausedWorkingHour'))
    {
      localStorage.removeItem('userPausedWorkingHour');
    }
  }

  addToLocal()
  {
    localStorage.setItem('userPausedWorkingHour','true');
  }
  
}
