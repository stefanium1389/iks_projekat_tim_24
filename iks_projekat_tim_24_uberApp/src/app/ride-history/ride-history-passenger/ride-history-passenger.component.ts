import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DriverDataService } from 'src/app/backend-services/driver-data-service.service';
import { ReviewDTO } from 'src/app/backend-services/DTO/ReviewDTO';
import { RideDTO } from 'src/app/backend-services/DTO/RideDTO';
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

  constructor(private reviews:ReviewDataService, private passengerData:PassengerDataService,private driverData:DriverDataService,private jwt: JwtService, private route:Router, private shareRideIdService:ShareRideIdService) { }

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
    this.shareRideIdService.setRideId(rideId);
    this.route.navigate(['/rate-ride']);
  }
  options = [
    {value: 'endTime', label: 'End Time'},
    {value: 'startTime', label: 'Start Time'},
    {value: 'totalCost', label: 'Total Cost'}
  ];
  onChange(event: any){
    this.sort = event.target.value;
  }
}
