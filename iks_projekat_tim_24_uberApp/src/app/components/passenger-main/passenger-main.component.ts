import { Component, OnInit,  Input} from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { TimeDialogComponent } from '../time-dialog/time-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';
import { SearchUserDialogComponent } from '../search-user-dialog/search-user-dialog.component';
import { LinkUsersService } from 'src/app/services/link-users.service';
import { interval } from 'rxjs';
import { JwtService } from '../jwt-service.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserDTO } from 'src/app/backend-services/DTO/UserDTO';
import { PanicDialogComponent } from "../panic-dialog/panic-dialog.component";
import { MapComponent } from '../map/map/map.component';
import { FormGroup, FormControl } from '@angular/forms';
import { TimeAndCost } from '../map/map/map.component';
import { RideDTO } from "../../backend-services/DTO/RideDTO";

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
  selectedTime: string = "xddd";
  showTime: boolean = false;
  linkedUsers: UserDTO[] = [];
  ride: RideDTO | null;
  rideStatus: string | null;//PENDING, CANCELED, STARTED, ACCEPTED, FINISHED, REJECTED
  previousRideStatus:string | null = "xd";
  time: number;
  cost: number;
  locationType: string = "departure";
  selectedType: string = 'STANDARD';
  
  mapType = "ALL";
  driverId: number | null = null;
  markers: any[];
  disabledClick = false;

  constructor(public dialog: MatDialog, private linkUsersService: LinkUsersService, private jwtService: JwtService, private http: HttpClient) 
  {
    this.destinationForm = new FormGroup({
      start_location: new FormControl(),
      end_location: new FormControl(),
    })
  }

  ngOnInit(): void
  {
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

  toggleFavorite() {
    this.isFavorited = !this.isFavorited;
  }

  onTypeChange(type: string) {
    this.map.locationType = type;
  }

  onVehicleTypeChange(type: string) {
    this.map.selectedVehicleType = type;
    this.map.route()
  }

  locStartHandler(loc: string) {
    this.destinationForm.get('start_location')?.setValue(loc);
  }

  locEndHandler(loc: string) {
    this.destinationForm.get('end_location')?.setValue(loc);
  }

  timeAndDistanceHandler(timeAndCost: TimeAndCost) {
    if (timeAndCost.time) {
      this.time = timeAndCost.time;
    }
    if (timeAndCost.cost) {
      this.cost = Number(timeAndCost.cost);
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
      this.showTime = true;
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
      width: '250px',
      data: {}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.linkedUsers=this.linkUsersService.usersList;
    });
  }
  removeUser(user:UserDTO){
    this.linkUsersService.removeUser(user);
    this.linkedUsers=this.linkUsersService.usersList;
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
