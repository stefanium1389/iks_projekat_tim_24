import { Component, OnInit, ViewChild } from '@angular/core';
import { DriverDataService } from 'src/app/backend-services/driver-data-service.service';
import { ReviewDTO } from 'src/app/backend-services/DTO/ReviewDTO';
import { RideDTO } from 'src/app/backend-services/DTO/RideDTO';
import { UserDTO } from 'src/app/backend-services/DTO/UserDTO';
import { VehicleDTO } from 'src/app/backend-services/DTO/VehicleDTO';
import { PassengerDataService } from 'src/app/backend-services/passenger-data.service';
import { ReviewDataService } from 'src/app/backend-services/review-data.service';
import { JwtService } from 'src/app/components/jwt-service.service';
import { MapComponent } from 'src/app/components/map/map/map.component';
import { AdminViewingService } from 'src/app/services/admin-viewing.service';
import { defaultPicture } from 'src/app/user';

@Component({
  selector: 'app-ride-history-driver-admin',
  templateUrl: './ride-history-driver-admin.component.html',
  styleUrls: ['./ride-history-driver-admin.component.css']
})
export class RideHistoryDriverAdminComponent implements OnInit {

  stars: number[] = [1, 2, 3, 4, 5];
  sort:string='endTime';
  @ViewChild(MapComponent) map !:any ;
  rides: RideDTO[];
  selectedRide: RideDTO;
  selectedRidePassengers: UserDTO[];
  selectedRideTime: number;
  markers: any[];
  selectedRideReviews: ReviewDTO[];
  
  constructor(private driverData: DriverDataService, private adminViewingService : AdminViewingService, private passengerData: PassengerDataService, private reviews:ReviewDataService) { }

  ngOnInit(): void {
    if(this.adminViewingService.getAdminViewingId()){
      const id:number = this.adminViewingService.getAdminViewingId()!;
      const fromDate:string = new Date(1991,11,18).toISOString();
      const toDate:string = new Date().toISOString();
      this.driverData.getDriverRidesPaginated(id,0,1000,this.sort,fromDate,toDate).subscribe({
        next: (result) => {
          this.rides = result.results;
        }
      })
    }
  }
  options = [
    {value: 'endTime', label: 'End Time'},
    {value: 'startTime', label: 'Start Time'},
    {value: 'totalCost', label: 'Total Cost'},
    {value: 'route.lenght', label: 'Route Length'}
  ];
  onChange(event: any){
    this.sort = event.target.value;
    const id:number = this.adminViewingService.getAdminViewingId()!;
    const fromDate:string = new Date(1991,11,18).toISOString();
    const toDate:string = new Date().toISOString();
    this.driverData.getDriverRidesPaginated(id,0,1000,this.sort,fromDate,toDate).subscribe({
      next: (result) => {
        
        this.rides = result.results;
      }
    })
  }
  selectRide(ride:RideDTO){
    this.selectedRide = ride;
    this.markers = [{lat:ride.locations[0].departure.latitude,lon:ride.locations[0].departure.longitude},{lat:ride.locations[0].destination.latitude,lon:ride.locations[0].destination.longitude}]
    this.selectedRideTime = Math.round((new Date(this.selectedRide.endTime).getTime() - new Date(this.selectedRide.startTime).getTime())/(60*1000));
    this.selectedRidePassengers = [];
    for(let i of ride.passengers){
      this.passengerData.getPassengerById(i.id).subscribe({
        next: (result) => {
          if (result.profilePicture == null) {
            result.profilePicture = defaultPicture;
          }
          this.selectedRidePassengers.push(result);
        }
      })
    }
    console.log(this.selectedRidePassengers)
    this.reviews.getReviewsByRideId(ride.id).subscribe({
      next: (result) => {
        this.selectedRideReviews = result.results;
      }
    })
  }

}
