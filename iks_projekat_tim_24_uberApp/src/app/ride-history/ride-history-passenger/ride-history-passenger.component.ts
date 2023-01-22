import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DriverDataService } from 'src/app/backend-services/driver-data-service.service';
import { ReviewDTO } from 'src/app/backend-services/DTO/ReviewDTO';
import { RideDTO, RideRequestDTO } from 'src/app/backend-services/DTO/RideDTO';
import { UserDTO } from 'src/app/backend-services/DTO/UserDTO';
import { VehicleDTO } from 'src/app/backend-services/DTO/VehicleDTO';
import { PassengerDataService } from 'src/app/backend-services/passenger-data.service';
import { ReviewDataService } from 'src/app/backend-services/review-data.service';
import { RideDataService } from 'src/app/backend-services/ride-data.service';
import { JwtService } from 'src/app/components/jwt-service.service';
import { MapComponent } from 'src/app/components/map/map/map.component';
import { Route, Router } from '@angular/router';
import * as L from 'leaflet';
import { ShareRideIdService } from 'src/app/services/share-ride-id.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TimeDialogComponent } from 'src/app/components/time-dialog/time-dialog.component';
import { FavoriteRideDTO } from 'src/app/backend-services/DTO/FavoriteRideDTO';
import { StringDialogComponent } from 'src/app/components/string-dialog/string-dialog.component';

@Component({
  selector: 'app-ride-history-passenger',
  templateUrl: './ride-history-passenger.component.html',
  styleUrls: ['./ride-history-passenger.component.css']
})
export class RideHistoryPassengerComponent implements OnInit {
  stars: number[] = [1, 2, 3, 4, 5];
  sort:string='endTime';
  @ViewChild(MapComponent) map !:any ;
  selectedRideDriver:UserDTO;
  selectedRideDriverReviews:ReviewDTO[];
  selectedRideVehicleReviews:ReviewDTO[];
  selectedRideVehicle:VehicleDTO;
  rides:RideDTO[];
  selectedRide: RideDTO;
  selectedRideReviews:ReviewDTO[];
  selectedRideDriverAvgRating:number;
  selectedRideVehicleAvgRating:number;  

  constructor(private reviews:ReviewDataService,
     private passengerData:PassengerDataService,
     private driverData:DriverDataService,
     private jwt: JwtService, 
     private route:Router, 
     private shareRideIdService:ShareRideIdService, 
     private snackBar: MatSnackBar, 
     private rideData: RideDataService, 
     private dialog: MatDialog) { }

  ngOnInit(): void {

    if(this.jwt.getId()){
      const id:number = this.jwt.getId()!;
      const fromDate:string = new Date(1991,11,18).toISOString();
      const toDate:string = new Date().toISOString();
      this.passengerData.getPassengerRidesPaginated(id,0,1000,this.sort,fromDate,toDate).subscribe({
        next: (result) => {
          this.rides = result.results;
        }
      })
    }
  }
  selectRide(ride:RideDTO){
    this.selectedRide = ride;
    console.log(ride);
    this.driverData.getDriverById(ride.driver.id).subscribe({
      next: (result) => {
        this.selectedRideDriver = result;
      }
    })
    this.reviews.getReviewsByRideId(ride.id).subscribe({
      next: (result) => {
        this.selectedRideReviews = result.results;
      }
    })
    this.reviews.getReviewsByDriverId(ride.driver.id).subscribe({
      next: (result) => {
        this.selectedRideDriverReviews = result.results;
        this.selectedRideDriverAvgRating = 0;
        for(let i of result.results){
          this.selectedRideDriverAvgRating += i.rating;
        }
        this.selectedRideDriverAvgRating /= result.totalCount;
      }
    })
    this.driverData.getVehicleByDriverId(ride.driver.id).subscribe({
      next: (result) => {
        this.selectedRideVehicle = result;
        this.reviews.getReviewsByVehicleId(result.id).subscribe({
          next: (result) => {
            this.selectedRideVehicleAvgRating = 0;
            for(let i of result.results){
              this.selectedRideVehicleAvgRating += i.rating;
            }
            this.selectedRideVehicleAvgRating /= result.totalCount
            this.selectedRideVehicleReviews = result.results;
          }
        })
      }
    })
  }
  openComment(rideId: number){
    
    const rideDate = new Date(this.selectedRide.endTime)
    rideDate.setDate(rideDate.getDate()+3);
    if(new Date().getTime() > rideDate.getTime()){
      this.snackBar.open('Ne mozete komentarisati na voznju stariju od 3 dana', 'Ok', {
        duration: 3000
      });
      return
    }
    this.shareRideIdService.setRideId(rideId);
    this.route.navigate(['/rate-ride']);
  }
  options = [
    {value: 'endTime', label: 'End Time'},
    {value: 'startTime', label: 'Start Time'},
    {value: 'totalCost', label: 'Total Cost'},
    {value: 'route.lenght', label: 'Route Length'}
  ];
  onChange(event: any){
    this.sort = event.target.value;
    const id:number = this.jwt.getId()!;
    const fromDate:string = new Date(1991,11,18).toISOString();
    const toDate:string = new Date().toISOString();
    this.passengerData.getPassengerRidesPaginated(id,0,1000,this.sort,fromDate,toDate).subscribe({
      next: (result) => {
        this.rides = result.results;
      }
    })
  }
  openTimePicker(arg0: RideDTO) {
    console.log("lmaooo");
    const dialogRef = this.dialog.open(TimeDialogComponent, {
      width: '250px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {

      const dto: RideRequestDTO = {
        locations: arg0.locations,
        passengers: arg0.passengers,
        vehicleType: arg0.vehicleType,
        scheduledTime: result,
        babyTransport: arg0.babyTransport,
        petTransport: arg0.petTransport
      }
      this.rideData.postRide(dto).subscribe({
        next: (result) => {
          console.log(result)
        },
        error: (error) => {
          this.snackBar.open(error.error.message, 'Ok', {
            duration: 3000
          });
        }
      });
    });
  }
  createRide(arg0: RideDTO) {
    console.log('kliknut sam :))');
    //console.log(arg0);
    const dto: RideRequestDTO = {
      locations: arg0.locations,
      passengers: arg0.passengers,
      vehicleType: arg0.vehicleType,
      scheduledTime: null,
      babyTransport: arg0.babyTransport,
      petTransport: arg0.petTransport
    }

    this.rideData.postRide(dto).subscribe({
      next: (result) => {
        console.log(result)
      },
      error: (error) => {
        this.snackBar.open(error.error.message, 'Ok', {
          duration: 3000
        });
      }
    });
  }
  makeFavorite(ride:RideDTO){
      const dialogRef = this.dialog.open(StringDialogComponent, {
        width: '250px',
        data: {}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        const fav:FavoriteRideDTO = {
          favoriteName:result,
          locations: ride.locations,
          passengers:ride.passengers, 
          vehicleType:ride.vehicleType,
          babyTransport:ride.babyTransport,
          petTransport:ride.petTransport
        }
    
        this.rideData.postFavoriteRide(fav).subscribe({
          next: (result) => {
            console.log(result)
          },
          error: (error) => {
            this.snackBar.open(error.error.message, 'Ok', {
              duration: 3000
            });
          }
        })
      });
    
    
  }
}
