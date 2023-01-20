import { Component, Input, OnInit } from '@angular/core';
import { DriverDataService } from 'src/app/backend-services/driver-data-service.service';
import { environment } from 'src/environments/environment';
import { UserDTO } from 'src/app/backend-services/DTO/UserDTO';
import { HttpErrorResponse } from '@angular/common/http';
import { RideHistoryDetailsComponent } from 'src/app/ride-history/ride-history-details/ride-history-details.component';
import { RideDTO } from 'src/app/backend-services/DTO/RideDTO';
import { VehicleDTO } from 'src/app/backend-services/DTO/VehicleDTO';
import { RideDataService } from 'src/app/backend-services/ride-data.service';
import { ReviewRequestDTO } from 'src/app/backend-services/DTO/ReviewDTO';
import { ReviewDataService } from 'src/app/backend-services/review-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-rate-ride',
  templateUrl: './rate-ride.component.html',
  styleUrls: ['./rate-ride.component.css']
})
export class RateRideComponent implements OnInit {

  @Input() rideId:number;
  driverRating:number=0;
  driverComment:string;
  vehicleRating:number=0;
  vehicleComment:string;
  ride:RideDTO;
  vehicle:VehicleDTO;
  driver:UserDTO;
  driverId:number;
  


  constructor(private driverCall: DriverDataService, private rideCall: RideDataService, private rds:ReviewDataService, private snackBar:MatSnackBar) { }

  ngOnInit(): void {

    this.rideCall.getRideById(this.rideId).subscribe({
      next: (result)=>{
        this.ride = result;
        this.driverId = result.driver.id;
        this.driverCall.getDriverById(this.ride.driver.id).subscribe({
          next: (result) => {
            this.driver = result;
          },
          error: (error) => {
            if (error instanceof HttpErrorResponse) {
              console.error(error);
            } 
          },
        })
        this.driverCall.getVehicleByDriverId(this.ride.driver.id).subscribe({
          next: (result) => {
            this.vehicle = result;
          },
          error: (error) => {
            if (error instanceof HttpErrorResponse) {
              console.error(error);
            } 
          },
        })
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error(error);
        } 
      }
    })
  }

  vozacRatingFunc(rating: number){
    this.driverRating=rating;
  }
  voziloRatingFunc(rating: number){
    this.vehicleRating=rating;
  }

  rateVehicle(){
    if(this.vehicleRating > 0 && (this.vehicleComment.length > 0 || this.vehicleComment != undefined)){
      const dto:ReviewRequestDTO = {
        rating:this.vehicleRating,
        comment:this.vehicleComment
      }
      this.rds.postVehicleReview(this.rideId,dto).subscribe({
        next: (result) => {
          this.snackBar.open('Komentar uspesno postavljen!', 'Ok', {
            duration: 3000
          });
        },
        error: (error) => {
          this.snackBar.open(error.error.message, 'Ok', {
            duration: 3000
          });
        }
      })
    }
    else{
      this.snackBar.open('Morate uneti komentar i izabrati ocenu!', 'Ok', {
        duration: 3000
      });
    }
  }

  rateDriver(){
    if(this.driverRating > 0 && (this.vehicleComment.length > 0 || this.vehicleComment != undefined)){
      const dto:ReviewRequestDTO = {
        rating:this.driverRating,
        comment:this.driverComment
      }
      this.rds.postDriverReview(this.rideId,dto).subscribe({
        next: (result) => {
          this.snackBar.open('Komentar uspesno postavljen!', 'Ok', {
            duration: 3000
          });
        },
        error: (error) => {
          this.snackBar.open(error.error.message, 'Ok', {
            duration: 3000
          });
        }
      })
    }
    else{
      this.snackBar.open('Morate uneti komentar i izabrati ocenu!', 'Ok', {
        duration: 3000
      });
    }
  }
}
