import { Component, OnInit,  Input} from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { TimeDialogComponent } from '../time-dialog/time-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';
import { User } from 'src/app/user';
import { SearchUserDialogComponent } from '../search-user-dialog/search-user-dialog.component';
import { LinkUsersService } from 'src/app/services/link-users.service';
import { interval } from 'rxjs';
import { JwtService } from '../jwt-service.service';
import { environment } from 'src/environments/environment';
import { dtoRide } from 'src/app/driver-main/driver-main.component';
import { HttpClient } from '@angular/common/http';
import { UserDTO } from 'src/app/backend-services/DTO/UserDTO';
import {PanicDialogComponent} from "../panic-dialog/panic-dialog.component";
import _default from "chart.js/dist/plugins/plugin.tooltip";
import numbers = _default.defaults.animations.numbers;
import { MapComponent } from '../map/map/map.component';
import { FormGroup, FormControl } from '@angular/forms';
import { TimeAndCost } from '../map/map/map.component';

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
  ride: dtoRide | null;
  rideStatus: string | null;//PENDING, CANCELED, STARTED, ACCEPTED, FINISHED, REJECTED
  previousRideStatus:string | null = "xd";
  time: number;
  cost: string;
  locationType: string = "departure";
  selectedType: string = 'STANDARD';

  constructor(public dialog: MatDialog, private linkUsersService: LinkUsersService, private jwtService: JwtService, private http: HttpClient) 
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
