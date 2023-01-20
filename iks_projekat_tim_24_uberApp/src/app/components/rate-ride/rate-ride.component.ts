import { Component, OnInit } from '@angular/core';
import { DriverDataService } from 'src/app/backend-services/driver-data-service.service';
import { environment } from 'src/environments/environment';
import { UserDTO } from 'src/app/backend-services/DTO/UserDTO';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-rate-ride',
  templateUrl: './rate-ride.component.html',
  styleUrls: ['./rate-ride.component.css']
})
export class RateRideComponent implements OnInit {

  vozacRating:number=0;
  voziloRating:number=0;
  vehicle:string="Ford Mondeo";
  driver:UserDTO;

  driverId:number;


  constructor(private driverCall: DriverDataService) { }

  ngOnInit(): void {
    this.driverCall.getDriverById(3).subscribe({
      next: (result) => {
        this.driver = result;
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error(error);
        } 
      },
    })
  }

  vozacRatingFunc(rating: number){
    this.vozacRating=rating;
  }
  voziloRatingFunc(rating: number){
    this.voziloRating=rating;
  }

  rateVehicle(){
    console.log(this.voziloRating);
    console.log
  }
  rateDriver(){
    console.log(this.vozacRating);
  }

}
