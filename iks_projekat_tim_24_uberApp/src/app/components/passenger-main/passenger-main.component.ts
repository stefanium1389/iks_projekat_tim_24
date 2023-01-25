import { Component, OnInit, Input } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { TimeDialogComponent } from '../time-dialog/time-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';
import { defaultPicture, User } from 'src/app/user';
import { SearchUserDialogComponent } from '../search-user-dialog/search-user-dialog.component';
import { LinkUsersService } from 'src/app/services/link-users.service';
import { interval } from 'rxjs';
import { JwtService } from '../jwt-service.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserDTO, UserRef } from 'src/app/backend-services/DTO/UserDTO';
import { PanicDialogComponent } from "../panic-dialog/panic-dialog.component";
import _default from "chart.js/dist/plugins/plugin.tooltip";
import numbers = _default.defaults.animations.numbers;
import { LocationInfo, MapComponent } from '../map/map/map.component';
import { FormGroup, FormControl } from '@angular/forms';
import { TimeAndCost } from '../map/map/map.component';
import { RideDTO } from 'src/app/backend-services/DTO/RideDTO';
import { FavoriteRideDTO } from 'src/app/backend-services/DTO/FavoriteRideDTO';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StringDialogComponent } from '../string-dialog/string-dialog.component';
import { RideDataService } from 'src/app/backend-services/ride-data.service';
import { GeoCoordinateDTO } from 'src/app/backend-services/DTO/RouteDTO';
import { RouteDTO } from 'src/app/backend-services/DTO/RouteDTO';
import { RideRequestDTO } from 'src/app/backend-services/DTO/RideDTO';
import { DriverDataService } from 'src/app/backend-services/driver-data-service.service';
import { VehicleDataService } from 'src/app/backend-services/vehicle-data.service';
import { VehicleDTO } from 'src/app/backend-services/DTO/VehicleDTO';
import { ReviewDataService } from 'src/app/backend-services/review-data.service';

@Component({
  selector: 'app-passenger-main',
  templateUrl: './passenger-main.component.html',
  styleUrls: ['./passenger-main.component.css']
})
export class PassengerMainComponent implements OnInit {

  @Input() timeAndDistance: { time: number, distance: number };
  destinationForm: FormGroup;
  @ViewChild(MapComponent) map !: any;
  inRide: boolean = false;
  isFavorited: boolean = false;
  hasBaby = false;
  hasPet: boolean = false;
  selectedTime: string;
  linkedUsers: UserDTO[] = [];
  ride: RideDTO | null;
  rideStatus: string | null;//PENDING, CANCELED, STARTED, ACCEPTED, FINISHED, REJECTED
  previousRideStatus: string | null = "xd";
  time: number;
  cost: number;
  locationType: string = "departure";
  selectedType: string = 'STANDARD';
  
  mapType = "ALL";
  driverId: number | null = null;
  markers: any[];
  disabledClick = false;
  
  name_of_start_location: string;
  name_of_end_location: string;
  start_location_lat: number;
  end_location_lat: number;
  start_location_lng: number;
  end_location_lng: number;
  alreadyFavorite: boolean = false;
  driver: UserDTO;
  vehicle: VehicleDTO;
  averageDriverScore: string;
  averageVehicleScore: string;

  constructor(public dialog: MatDialog, private linkUsersService: LinkUsersService,
    private jwtService: JwtService, private http: HttpClient, private snackBar: MatSnackBar,
    private rideData: RideDataService, private driverDataService: DriverDataService,
    private vehicleDataService: VehicleDataService, private reviewDataService: ReviewDataService) {

    this.destinationForm = new FormGroup({
      start_location: new FormControl(),
      end_location: new FormControl(),
    })
  }

  ngOnInit(): void
  {
    interval(5000).subscribe(() => {
        this.getRide();
        if(this.ride) {
          this.rideStatus = this.ride.status;
          this.inRide = true;
        }
        else
        {
          this.inRide = false;
          this.rideStatus = null;
        }
    });
  }

  search(which: string) {
    if (which === "start") {
      this.map.search(this.destinationForm.get('start_location')?.value, "start");
    }
    else {
      this.map.search(this.destinationForm.get('end_location')?.value, "end");
    }

  }

  setFavorited() {
    this.isFavorited = true;
    this.alreadyFavorite = true;
  }

  setNotFavorited() {
    this.isFavorited = false;
    this.alreadyFavorite = false;
  }

  makeFavorite() {

    if (this.alreadyFavorite) {
      return;
    }

    const dialogRef = this.dialog.open(StringDialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == undefined || result.length < 1) {
        this.snackBar.open('Morate uneti naziv!', 'Ok', {
          duration: 3000
        });
        return;
      }

      let g1: GeoCoordinateDTO =
      {
        address: this.name_of_start_location,
        latitude: this.start_location_lat,
        longitude: this.start_location_lng,
      }
      let g2: GeoCoordinateDTO =
      {
        address: this.name_of_end_location,
        latitude: this.end_location_lat,
        longitude: this.end_location_lng,
      }

      let route: RouteDTO =
      {
        departure: g1,
        destination: g2,
      }

      let passengers: UserRef[] = [];
      for (let p of this.linkedUsers) {
        let ur: UserRef =
        {
          id: p.id,
          email: p.email,
        };

        passengers.push(ur);
      }

      const fav: FavoriteRideDTO = {
        favoriteName: result,
        locations: [route],
        passengers: passengers,
        vehicleType: this.selectedType,
        babyTransport: this.hasBaby,
        petTransport: this.hasPet
      }

      this.rideData.postFavoriteRide(fav).subscribe({
        next: (result) => {
          console.log(result)
          this.setFavorited();
          this.snackBar.open("Ruta dodata u omiljene!", 'Ok', {
            duration: 3000
          });

        },
        error: (error) => {
          this.snackBar.open(error.error.message, 'Ok', {
            duration: 3000
          });
        }
      })
    });


  }

  createRide() {

    let g1: GeoCoordinateDTO =
    {
      address: this.name_of_start_location,
      latitude: this.start_location_lat,
      longitude: this.start_location_lng,
    }
    let g2: GeoCoordinateDTO =
    {
      address: this.name_of_end_location,
      latitude: this.end_location_lat,
      longitude: this.end_location_lng,
    }

    let route: RouteDTO =
    {
      departure: g1,
      destination: g2,
    }

    let passengers: UserRef[] = [];
    for (let p of this.linkedUsers) {
      let ur: UserRef =
      {
        id: p.id,
        email: p.email,
      };

      passengers.push(ur);
    }

    let requestTime = null;
    if (this.selectedTime) {
      requestTime = this.getDateWithGivenTime(this.selectedTime);
    }

    const dto: RideRequestDTO = {
      locations: [route],
      passengers: passengers,
      vehicleType: this.selectedType,
      scheduledTime: requestTime,
      babyTransport: this.hasBaby,
      petTransport: this.hasPet
    }

    this.rideData.postRide(dto).subscribe({
      next: (result) => {
        this.setDriver(result);
        this.setVehicle(result);
        this.setReviews(result);
        this.snackBar.open("uspešno kreirana vožnja!", 'Ok', {
          duration: 3000
        });
      },
      error: (error) => {
        this.snackBar.open(error.error.message, 'Ok', {
          duration: 3000
        });
      }
    });
  }

  onTypeChange(type: string) {
    this.map.locationType = type;
  }

  onVehicleTypeChange(type: string) {
    this.map.selectedVehicleType = type;
    this.map.route()
  }

  locStartHandler(loc: LocationInfo) {
    this.destinationForm.get('start_location')?.setValue(loc.name);
    this.name_of_start_location = loc.name;
    this.start_location_lng = loc.lng;
    this.start_location_lat = loc.lat;
    this.setNotFavorited();
  }

  locEndHandler(loc: LocationInfo) {
    this.destinationForm.get('end_location')?.setValue(loc.name);
    this.name_of_end_location = loc.name;
    this.end_location_lng = loc.lng;
    this.end_location_lat = loc.lat;
    this.setNotFavorited();
  }

  timeAndDistanceHandler(timeAndCost: TimeAndCost) {
    if (timeAndCost.time) {
      this.time = timeAndCost.time;
    }
    if (timeAndCost.cost) {
      this.cost = Number(timeAndCost.cost);
    }

  }

  @ViewChild('checkbox_option', { static: false }) checkbox_option: ElementRef;
  onBabyClick() {
    this.hasBaby = !this.hasBaby;
    if (this.hasBaby) {
      this.checkbox_option.nativeElement.classList.add('clicked');
    } else {
      this.checkbox_option.nativeElement.classList.remove('clicked');
    }
  }

  openTimePicker() {
    const dialogRef = this.dialog.open(TimeDialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The time picker dialog was closed');
      this.selectedTime = result;
    });
  }

  openReportDialog(): void {
    const dialogRef = this.dialog.open(ReportDialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == null)
      {
        return;
      }
      this.driverDataService.reportDriver(this.driver.id, { reason: result }).subscribe({
        next: (result) => {
          this.snackBar.open("report submited.", 'Ok', {
            duration: 3000
          });
        },
        error: (error) => {
          this.snackBar.open(error.error.message, 'Ok', {
            duration: 3000
          });
        }
      });
    });
  }
  openUserSearch(): void {
    const dialogRef = this.dialog.open(SearchUserDialogComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.linkedUsers = this.linkUsersService.usersList;
      for (let user of this.linkedUsers) {
        if (user.profilePicture == null) {
          user.profilePicture = defaultPicture;
        }
      }
    });
  }
  removeUser(user: UserDTO) {
    this.linkUsersService.removeUser(user);
    this.linkedUsers = this.linkUsersService.usersList;
  }

  async getRide()
  {
    const userId = this.jwtService.getId();
    try{
      const response = await this.http.get(environment.apiBaseUrl + `api/ride/passenger/${userId}/active`).toPromise() as RideDTO;
      this.ride = response;
      console.log(this.ride)
      this.cost = this.ride.totalCost;
      this.time = this.ride.estimatedTimeInMinutes;
      this.setDriver(this.ride);
      this.setVehicle(this.ride);
      this.setReviews(this.ride);
      
      this.mapType = "RIDE";
      this.driverId = this.ride.driver.id;
      this.markers = [{lat:this.ride.locations[0].departure.latitude,lon:this.ride.locations[0].departure.longitude},{lat:this.ride.locations[0].destination.latitude,lon:this.ride.locations[0].destination.longitude}]
      this.disabledClick = true;
    }
    catch (HttpErrorResponse){
      this.ride=null;
  
      this.mapType = "ALL";
      this.driverId = null;
      this.markers = [];
      this.disabledClick = false;
    }
  }

  panic() {
    const dialogRef = this.dialog.open(PanicDialogComponent, {
      width: '250px',
      data: { rideId: this.ride?.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  getDateWithGivenTime(time: string) {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const givenTimeArr = time.split(":");
    const givenHour = parseInt(givenTimeArr[0]);
    const givenMinutes = parseInt(givenTimeArr[1]);

    let newDate: Date;
    if (givenHour < currentHour || (givenHour === currentHour && givenMinutes <= currentMinutes)) {
      // given time is before or equal to current time
      newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, givenHour + 1, givenMinutes);
    } else {
      // given time is after current time
      newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), givenHour + 1, givenMinutes);
    }
    return newDate.toISOString()
  }

  setDriver(dto: RideDTO) {
      this.driverDataService.getDriverById(dto.driver.id).subscribe({
      next: (result) => {
        if (result.profilePicture==null)
        result.profilePicture=defaultPicture;
        this.driver = result;
      },
      error: (error) => {
        this.snackBar.open(error.error.message, 'Ok', {
          duration: 3000
        });
      }
    });
  }

  setVehicle(dto: RideDTO) {
    this.vehicleDataService.getVehicleByDriverId(dto.driver.id).subscribe({
      next: (result) => {
        this.vehicle = result;
      },
      error: (error) => {
        this.snackBar.open(error.error.message, 'Ok', {
          duration: 3000
        });
      }
    });
  }

  setReviews(dto: RideDTO) {
    this.reviewDataService.getReviewsByDriverId(dto.driver.id).subscribe({
      next: (result) => {
        let sumDriver = 0;
        for (let review of result.results)
        {
          sumDriver += review.rating;
        }
        if (sumDriver === 0)
        {
          this.averageDriverScore="none";
        }
        else
        {
          this.averageDriverScore=(sumDriver/result.totalCount).toFixed(2);
        }
      }
    });

    this.vehicleDataService.getVehicleByDriverId(dto.driver.id).subscribe({
      next: (result) => {
        this.reviewDataService.getReviewsByVehicleId(result.id).subscribe({
          next: (result) => {
            let sumVehicle= 0;
            for (let review of result.results)
            {
              sumVehicle += review.rating;
            }
            if (sumVehicle === 0)
            {
              this.averageVehicleScore="none";
            }
            else
            {
              this.averageVehicleScore=(sumVehicle/result.totalCount).toFixed(2);
            }
          }
        });
      },
      error: (error) => {
        this.snackBar.open(error.error.message, 'Ok', {
          duration: 3000
        });
      }
    });

  }

}
