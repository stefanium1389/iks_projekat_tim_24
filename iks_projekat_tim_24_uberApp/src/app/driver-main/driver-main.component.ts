import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkingHourService } from '../services/working-hour.service';
import { NgbDatepickerKeyboardService } from '@ng-bootstrap/ng-bootstrap';
import { interval, takeWhile } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtService } from '../components/jwt-service.service';
import { UserDTO } from '../backend-services/DTO/UserDTO';
import { PanicDialogComponent } from "../components/panic-dialog/panic-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { RideDTO } from "../backend-services/DTO/RideDTO";
import { PassengerDataService } from '../backend-services/passenger-data.service';
import { defaultPicture } from '../user';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-driver-main',
  templateUrl: './driver-main.component.html',
  styleUrls: ['./driver-main.component.css']
})
export class DriverMainComponent implements OnInit {

  activityStatus = "";
  workHours = "";
  isDriverActive: boolean;
  isWorkingHourButtonDisabled: boolean;
  acceptedRide: RideDTO | null;
  inRide: boolean = false;
  _isActive: boolean = true;

  mapType = "ALL";
  driverId: number | null = null;
  markers: any[];

  time: number;
  cost: number;
  pets: boolean;
  baby: boolean;

  startLocation: string;
  endLocation: string;
  passenger: UserDTO;

  constructor(public dialog: MatDialog, private whService: WorkingHourService,
     private http: HttpClient, private jwtService: JwtService, private passengerDataService: PassengerDataService,
     private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    interval(5000).subscribe(() => {
      this.getAcceptedRide();
      if (this.acceptedRide) {
        this.inRide = true;
      }
      else {
        this.inRide = false;
      }
    });

    this.whService.statusChanged.subscribe(status => {
      this.handleStatusChange(status);
    });

    this.whService.errorEmitter.subscribe(status => {
      this.handleError(status);
    });

    this.whService.initialCheckForWorkingHour();
    this.getAndSetActiveHours();

  }

  handleStatusChange(status: string) {
    if (status === 'active') {
      this.activateDrivingSession();
    } else if (status === 'inactive') {
      this.endDrivingSession();
    }
  }

  handleError(status: string) {
    if (status === 'exceeded') {
      this.hoursExceeded();
    } else if (status === 'revert') {
      this.revertExceeded();
    } else {
      alert(status);
    }
  }

  activateDrivingSession() {
    this.isDriverActive = true;
    this.activityStatus = "aktivan";
  }

  endDrivingSession() {
    this.isDriverActive = false;
    this.activityStatus = "neaktivan";
  }

  hoursExceeded() {
    this.isDriverActive = false;
    this.activityStatus = "premašeno je 8h rada!"
    this.isWorkingHourButtonDisabled = true;

  }

  async getAndSetActiveHours() {
    try {
      const duration = await this.whService.getActiveTime();
      if (duration) {
        this.workHours = duration.duration;
      }

    } catch (error) {
      alert(error);
    }
  }


  revertExceeded() {
    //wip
  }

  onClickEndDriverHour() {
    this.whService.onClickEnd();
    this.getAndSetActiveHours();
  }

  onClickStartDriverHour() {
    this.whService.onClickStart();
    this.getAndSetActiveHours();
  }

  startRide() {
    if (this.acceptedRide) {
      const id = this.acceptedRide.id;
      try {
        this.http.put(environment.apiBaseUrl + `api/ride/${id}/start`, {}).toPromise();
      }
      catch (HttpErrorResponse) {
        console.error(HttpErrorResponse);
      }
    }
  }

  async stopRide() {
    if (this.acceptedRide) {
      const id = this.acceptedRide.id;
      try {
        this.http.put(environment.apiBaseUrl + `api/ride/${id}/end`, {}).toPromise();
      }
      catch (HttpErrorResponse) {
        console.error(HttpErrorResponse);
      }
    }
  }

  hasAcceptedRide(): boolean {
    if (this.acceptedRide) {
      return true;
    }
    return false;
  }

  async getAcceptedRide() {
    const driverId = this.jwtService.getId();
    try {
      const response = await this.http.get(environment.apiBaseUrl + `api/ride/driver/${driverId}/active`).toPromise() as RideDTO;
      this.acceptedRide = response;
      this.cost = this.acceptedRide.totalCost;
      this.time = this.acceptedRide.estimatedTimeInMinutes;
      this.baby = this.acceptedRide.babyTransport;
      this.pets = this.acceptedRide.petTransport;

      let departure = this.acceptedRide.locations.at(0)?.departure;
      if (departure?.address) {
        this.startLocation = departure.address;
      }
      let destination = this.acceptedRide.locations.at(0)?.destination;
      if (destination?.address) {
        this.endLocation = destination.address;
      }

      let passengerId = this.acceptedRide.passengers.at(0)?.id
      if (passengerId)
      {
        this.setPassenger(passengerId);
      }

      this.mapType = "RIDE";
      this.driverId = this.acceptedRide.driver.id;
      this.markers = [{ lat: this.acceptedRide.locations[0].departure.latitude, lon: this.acceptedRide.locations[0].departure.longitude }, { lat: this.acceptedRide.locations[0].destination.latitude, lon: this.acceptedRide.locations[0].destination.longitude }]
    }
    catch (HttpErrorResponse) {
      this.acceptedRide = null;

      this.mapType = "ALL";
      this.driverId = null;
      this.markers = [];
    }
  }
  isActive() {
    return this._isActive;
  }
  activeButtonClick() {
    this._isActive = !this._isActive;
  }

  panic() {
    const dialogRef = this.dialog.open(PanicDialogComponent, {
      width: '250px',
      data: { rideId: this.acceptedRide?.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  setPassenger(id: number) {
    this.passengerDataService.getPassengerById(id).subscribe({
    next: (result) => {
      if (result.profilePicture==null)
      result.profilePicture=defaultPicture;
      this.passenger = result;
    },
    error: (error) => {
      this.snackBar.open(error.error.message, 'Ok', {
        duration: 3000
      });
    }
  });
}

}
