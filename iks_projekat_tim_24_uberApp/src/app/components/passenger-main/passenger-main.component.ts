import { Component, OnInit,  Input} from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { TimeDialogComponent } from '../time-dialog/time-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';
import { defaultPicture, User } from 'src/app/user';
import { SearchUserDialogComponent } from '../search-user-dialog/search-user-dialog.component';
import { LinkUsersService } from 'src/app/services/link-users.service';
import { interval } from 'rxjs';
import { JwtService } from '../jwt-service.service';
import { environment } from 'src/environments/environment';
import { dtoRide } from 'src/app/driver-main/driver-main.component';
import { HttpClient } from '@angular/common/http';
import { UserDTO, UserRef } from 'src/app/backend-services/DTO/UserDTO';
import {PanicDialogComponent} from "../panic-dialog/panic-dialog.component";
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

@Component({
  selector: 'app-passenger-main',
  templateUrl: './passenger-main.component.html',
  styleUrls: ['./passenger-main.component.css']
})
export class PassengerMainComponent implements OnInit {

  @Input() timeAndDistance: { time: number, distance: number };
  destinationForm: FormGroup;
  @ViewChild(MapComponent) map !: any;
  inRide: boolean = true;
  isFavorited: boolean = false;
  hasBaby = false;
  hasPet: boolean = false;
  selectedTime: string;
  linkedUsers: UserDTO[] = [];
  ride: dtoRide | null;
  rideStatus: string | null;//PENDING, CANCELED, STARTED, ACCEPTED, FINISHED, REJECTED
  previousRideStatus:string | null = "xd";
  time: number;
  cost: string;
  locationType: string = "departure";
  selectedType: string = 'STANDARD';
  name_of_start_location : string;
  name_of_end_location : string;
  start_location_lat :number;
  end_location_lat :number;
  start_location_lng :number;
  end_location_lng :number;
  alreadyFavorite: boolean = false;

  constructor(public dialog: MatDialog, private linkUsersService: LinkUsersService,
     private jwtService: JwtService, private http: HttpClient,private snackBar: MatSnackBar,private rideData: RideDataService ) 
  {
    this.destinationForm = new FormGroup({
      start_location: new FormControl(),
      end_location: new FormControl(),
    })

  }

  ngOnInit(): void {
    interval(5000).subscribe(() => {
        this.getRide();
        if(this.ride){
          this.rideStatus=this.ride.status;
        }
        else{
          this.rideStatus=null;
        }
        if(this.previousRideStatus!=this.rideStatus){
          this.previousRideStatus=this.rideStatus;
          if(this.ride?.status=="PENDING"){
            alert('Voznja je kreirana i na cekanju');
          }
          if(this.ride?.status=="ACCEPTED"){
            alert('Voznja je prihvacena');
          }
          if(this.ride?.status=="REJECTED"){
            alert('Voznja je odbijena');
          }
          if(this.ride?.status=="STARTED"){
            alert('Voznja je pocela');
          }
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

  makeFavorite(){

    if (this.alreadyFavorite)
    {
      return;
    }

    const dialogRef = this.dialog.open(StringDialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == undefined || result.length < 1){
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
        for (let p of this.linkedUsers)
        {
          let ur : UserRef = 
          {
            id: p.id,
            email : p.email,
          };
          
          passengers.push(ur);
        }

      const fav:FavoriteRideDTO = {
        favoriteName:result,
        locations: [route],
        passengers:passengers, 
        vehicleType:this.selectedType,
        babyTransport:this.hasBaby,
        petTransport:this.hasPet
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

  onTypeChange(type: string) {
    this.map.locationType = type;
  }

  onVehicleTypeChange(type: string) {
    this.map.selectedVehicleType = type;
    this.map.route()
  }

  locStartHandler(loc:LocationInfo) {
    this.destinationForm.get('start_location')?.setValue(loc.name);
    this.start_location_lng = loc.lng;
    this.start_location_lat = loc.lat;
    this.setNotFavorited();
  }

  locEndHandler(loc:LocationInfo) {
    this.destinationForm.get('end_location')?.setValue(loc.name);
    this.end_location_lng = loc.lng;
    this.end_location_lat = loc.lat;
    this.setNotFavorited();
  }

  timeAndDistanceHandler(timeAndCost: TimeAndCost) {
    if (timeAndCost.time) {
      this.time = timeAndCost.time;
    }
    if (timeAndCost.cost) {
      this.cost = Number(timeAndCost.cost).toFixed(2);
    }

  }

  @ViewChild('checkbox_option', {static: false}) checkbox_option: ElementRef;
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
  
  openDialog(): void {
    const dialogRef = this.dialog.open(ReportDialogComponent, {
      width: '250px',
      data: {}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
  openUserSearch(): void {
    const dialogRef = this.dialog.open(SearchUserDialogComponent, {
      width: '500px',
      data: {}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.linkedUsers=this.linkUsersService.usersList;
      for (let user of this.linkedUsers)
      {
        if (user.profilePicture == null)
        {
          user.profilePicture = defaultPicture;
        }
      }
    });
  }
  removeUser(user:UserDTO){
    this.linkUsersService.removeUser(user);
    this.linkedUsers=this.linkUsersService.usersList;
  }

  async getRide(){
    const userId = this.jwtService.getId();
    try{
      const response = await this.http.get(environment.apiBaseUrl + `api/ride/passenger/${userId}/active`).toPromise() as dtoRide;
      this.ride = response;
    }
    catch (HttpErrorResponse){
      this.ride=null;
    }
  }
  
  panic()
  {
    const dialogRef = this.dialog.open(PanicDialogComponent, {
      width: '250px',
      data: {rideId: this.ride?.id}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}
