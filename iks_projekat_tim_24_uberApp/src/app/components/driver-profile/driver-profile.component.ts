import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { TimeDialogComponent } from '../time-dialog/time-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { BlockDialogComponent } from '../block-dialog/block-dialog.component';
import { JwtService } from '../jwt-service.service';
import { defaultPicture } from 'src/app/user';
import { PassengerDataService } from 'src/app/backend-services/passenger-data.service';
import { PassengerUpdateDTO } from 'src/app/backend-services/DTO/UserDTO';
import { PasswordChangeDTO } from 'src/app/backend-services/DTO/UserDTO';
import { DriverDataService } from 'src/app/backend-services/driver-data-service.service';
import { VehicleChangeDTO } from 'src/app/backend-services/DTO/VehicleDTO';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-driver-profile',
  templateUrl: './driver-profile.component.html',
  styleUrls: ['./driver-profile.component.css']
})
export class DriverProfileComponent implements OnInit {

  drivesBabies: boolean;
  drivesPets: boolean;
  isAdmin: boolean = false;
  validFile: boolean = true;
  base64String: string | undefined;
  pictureReader: FileReader;
  vehicleTypes = ["Van", "Luxury", "Standard"];

  ProfileForm = new FormGroup({
    name: new FormControl(),
    surname: new FormControl(),
    address: new FormControl(),
    phone: new FormControl()
  });

  PasswordForm = new FormGroup({
    oldPass: new FormControl(),
    newPass: new FormControl(),
  });

  VehicleForm = new FormGroup({
    model: new FormControl(),
    plates: new FormControl(),
    selectedVehicleType: new FormControl(),
    numberOfSeats: new FormControl(),
    drivesBabies: new FormControl(),
    drivesPets: new FormControl()
  });

  selectedVehicleType: string;

  constructor(public dialog: MatDialog, private jwtService: JwtService,
    private driverService: DriverDataService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.base64String = defaultPicture;
    this.pictureReader = new FileReader();
    this.loadForms();
    this.setReader();

  }

  setReader() {
    this.pictureReader.onloadend = () => {
      if (this.pictureReader === null) {
        throw new Error("No reader!");
      } else {
        this.base64String = this.pictureReader.result?.toString();
      }

    };
  }

  loadForms() {
    let id = this.jwtService.getId();
    if (id != null) {
      this.driverService.getDriverById(id).subscribe(
        {
          next: (result) => {
            if (result.profilePicture !== null) {
              this.base64String = result.profilePicture;
            }
            this.ProfileForm.get('name')?.setValue(result.name);
            this.ProfileForm.get('surname')?.setValue(result.surname);
            this.ProfileForm.get('address')?.setValue(result.address);
            this.ProfileForm.get('phone')?.setValue(result.telephoneNumber);
          },
          error: (error) => {
            this.snackBar.open(error.error.message, 'Ok', {
              duration: 3000
            });
          }
        }
      );

      this.driverService.getVehicle(id).subscribe(
        {
          next: (result) => {
            let finalString = `${result.vehicleType.charAt(0).toUpperCase()}${result.vehicleType.slice(1).toLowerCase()}`;
            this.VehicleForm.get('selectedVehicleType')?.setValue(finalString);
            this.VehicleForm.get('model')?.setValue(result.model);
            this.VehicleForm.get('plates')?.setValue(result.licenseNumber);
            this.VehicleForm.get('numberOfSeats')?.setValue(result.passengerSeats);
            this.VehicleForm.get('drivesBabies')?.setValue(result.babyTransport);
            this.VehicleForm.get('drivesPets')?.setValue(result.petTransport);
          },
          error: (error) => {
            this.snackBar.open(error.error.message, 'Ok', {
              duration: 3000
            });
          }
        }
      );
    }
  }

  onProfileFormSubmit() {

    if (this.ProfileForm.get('name')!.value === "") {
      this.snackBar.open("missing name in form!", 'Ok', {
        duration: 3000
      });
      return;
    }
    if (this.ProfileForm.get('surname')!.value === "") {
      this.snackBar.open("missing surname in form!", 'Ok', {
        duration: 3000
      });
      return;
    }
    if (this.validFile === false) {
      this.snackBar.open("picture not valid!", 'Ok', {
        duration: 3000
      });
      return;
    }
    if (this.ProfileForm.get('phone')!.value === "") {
      this.snackBar.open("missing telephone number in form!", 'Ok', {
        duration: 3000
      });
      return;
    }
    if (this.ProfileForm.get('address')!.value === "") {
      this.snackBar.open("missing address in form!", 'Ok', {
        duration: 3000
      });
      return;
    }

    let id = this.jwtService.getId();
    let mail = this.jwtService.getEmail();
    if (id != null && mail != null && this.base64String != null) {
      let userUpdate: PassengerUpdateDTO = {
        name: this.ProfileForm.get('name')!.value,
        surname: this.ProfileForm.get('surname')!.value,
        profilePicture: this.base64String,
        telephoneNumber: this.ProfileForm.get('phone')!.value,
        email: mail,
        address: this.ProfileForm.get('address')!.value,
      }
      this.driverService.postDriverChangesNoPassword(id, userUpdate).subscribe(
        {
          next: (result) => {
            this.snackBar.open("changes saved.", 'Ok', {
              duration: 3000
            });
          },
          error: (error) => {
            this.snackBar.open(error.error.message, 'Ok', {
              duration: 3000
            });
          }
        }
      );
    }

  }

  onPasswordFormSubmit() {

    if (this.PasswordForm.get('oldPass')!.value === "") {
      this.snackBar.open("missing old password in form!", 'Ok', {
        duration: 3000
      });
      return;
    }
    if (this.PasswordForm.get('newPass')!.value === "") {
      this.snackBar.open("missing new password in form!", 'Ok', {
        duration: 3000
      });
      return;
    }

    let id = this.jwtService.getId();
    let mail = this.jwtService.getEmail();
    if (id != null && mail != null && this.base64String != null) {
      let userUpdate: PasswordChangeDTO = {
        oldPassword: this.PasswordForm.get('oldPass')!.value,
        newPassword: this.PasswordForm.get('newPass')!.value,
      }
      this.driverService.updateDriverPassword(id, userUpdate).subscribe(response => {
        if (response.status === 204) {
          console.log("password changed successfully");
        } else {
          console.log("error changing password");
        }
      });
    }
  }

  onVehicleFormSubmit() {

    if (this.VehicleForm.get('model')!.value === "") {
      this.snackBar.open("missing model in form!", 'Ok', {
        duration: 3000
      });
      return;
    }
    if (this.VehicleForm.get('plates')!.value === "") {
      this.snackBar.open("missing plates in form!", 'Ok', {
        duration: 3000
      });
      return;
    }
    if (this.VehicleForm.get('numberOfSeats')!.value === "") {
      this.snackBar.open("missing number of seats in form!", 'Ok', {
        duration: 3000
      });
      return;
    }
    if (this.VehicleForm.get('numberOfSeats')!.value < 1) {
      this.snackBar.open("invalid number of seats number!", 'Ok', {
        duration: 3000
      });
      return;
    }

    let id = this.jwtService.getId();
    let mail = this.jwtService.getEmail();
    if (id != null && mail != null && this.base64String != null) {
      this.selectedVehicleType = this.VehicleForm.get("selectedVehicleType")!.value;
      let vehicleUpdate: VehicleChangeDTO = {
        driverId: id,
        vehicleType: this.VehicleForm.get("selectedVehicleType")!.value,
        model: this.VehicleForm.get('model')!.value,
        licenseNumber: this.VehicleForm.get('plates')!.value,
        passengerSeats: this.VehicleForm.get('numberOfSeats')!.value,
        babyTransport: this.drivesBabies,
        petTransport: this.drivesPets
      }
      this.driverService.updateVehicle(id, vehicleUpdate).subscribe(
        {
          next: (result) => {
            this.snackBar.open("changes saved.", 'Ok', {
              duration: 3000
            });
          },
          error: (error) => {
            this.snackBar.open(error.error.message, 'Ok', {
              duration: 3000
            });
          }
        }
      );
    }
  }

  onChangePicture(event: any) {
    const file = event.target.files[0];
    if (file.type.split('/')[0] !== 'image') {
      this.validFile = false;
    }
    this.pictureReader.readAsDataURL(file);
  }

  openBlockDialog(): void {
    const dialogRef = this.dialog.open(BlockDialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}

