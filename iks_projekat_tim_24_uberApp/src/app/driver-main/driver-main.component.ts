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
    this.http.post(`${environment.apiBaseUrl}/api/driver/${this.jwtService.getId()}/working-hour`, {})
        .subscribe(
            response => { console.log(response) },
            error => { console.error(error) }
        );
}

  startRide(){
    this.inRide=true;
  }
  stopRide(){
    this.inRide=false;
  }
  panic(){
    alert("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  }
}
