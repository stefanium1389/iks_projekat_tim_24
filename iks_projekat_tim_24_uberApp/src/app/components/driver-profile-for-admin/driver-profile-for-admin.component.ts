import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BlockDialogComponent } from '../block-dialog/block-dialog.component';
import { JwtService } from '../jwt-service.service';
import { defaultPicture } from 'src/app/user';
import { PassengerUpdateDTO } from 'src/app/backend-services/DTO/UserDTO';
import { PasswordChangeDTO } from 'src/app/backend-services/DTO/UserDTO';
import { DriverDataService } from 'src/app/backend-services/driver-data-service.service';
import { VehicleChangeDTO } from 'src/app/backend-services/DTO/VehicleDTO';
import { AdminViewingService } from 'src/app/services/admin-viewing.service';

@Component({
  selector: 'app-driver-profile-for-admin',
  templateUrl: './driver-profile-for-admin.component.html',
  styleUrls: ['./driver-profile-for-admin.component.css']
})
export class DriverProfileForAdminComponent implements OnInit {

  drivesBabies : boolean;
  drivesPets : boolean;
  validFile: boolean = true;
  base64String : string | undefined;
  pictureReader: FileReader;
  vehicleTypes = ["Van","Luxury","Standard"];
  
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
    type: new FormControl(),
    numberOfSeats: new FormControl(),
    drivesBabies: new FormControl(),
    drivesPets: new FormControl()
  });
  selectedVehicleType:string;

  constructor(public dialog: MatDialog, private adminViewingService: AdminViewingService, private driverService : DriverDataService) { }

  ngOnInit(): void {
    this.base64String = defaultPicture;
    this.pictureReader = new FileReader();
    this.loadForms();
    this.setReader();
  }

  setReader ()
  {
   this.pictureReader.onloadend = () => {
     if (this.pictureReader === null)
     {
       throw new Error("No reader!");
     }else
     {
       this.base64String = this.pictureReader.result?.toString();
     }
     
  };
  }

  loadForms()
  {
    let id = this.adminViewingService.getAdminViewingId();
    if (id != null)
    {
      this.driverService.getDriverById(id).subscribe(
        {
          next: (result) => 
          {
            if (result.profilePicture !== null)
            {
              this.base64String = result.profilePicture;
            }
            this.ProfileForm.get('name')?.setValue(result.name);
            this.ProfileForm.get('surname')?.setValue(result.surname);
            this.ProfileForm.get('address')?.setValue(result.address);
            this.ProfileForm.get('phone')?.setValue(result.telephoneNumber);
          },
          error: (error) =>
          {
            alert(error);
          }
        }
        );

        this.driverService.getVehicle(id).subscribe(
          {
            next: (result) => 
            {
              let finalString = `${result.vehicleType.charAt(0).toUpperCase()}${result.vehicleType.slice(1).toLowerCase()}`;
              this.VehicleForm.get('type')?.setValue(finalString);
              this.VehicleForm.get('model')?.setValue(result.model);
              this.VehicleForm.get('plates')?.setValue(result.licenseNumber);
              this.VehicleForm.get('numberOfSeats')?.setValue(result.passengerSeats);
              this.VehicleForm.get('drivesBabies')?.setValue(result.babyTransport);
              this.VehicleForm.get('drivesPets')?.setValue(result.petTransport);
            },
            error: (error) =>
            {
              alert(error);
            }
          }
        );
    }
  }

  onProfileFormSubmit ()
  {

    if (this.ProfileForm.get('name')!.value === "")
    {
      alert("missing name in form!");
      return;
    }
    if (this.ProfileForm.get('surname')!.value === "")
    {
      alert("missing surname in form!");
      return;
    }
    if (this.validFile === false)
    {
      alert("picture not valid!");
      return;
    }
    if (this.ProfileForm.get('phone')!.value === "")
    {
      alert("missing telephone number in form!");
      return;
    } 
    if (this.ProfileForm.get('address')!.value === "")
    {
      alert("missing address in form!");
      return;
    }

    let id = this.adminViewingService.getAdminViewingId();
    let mail = this.adminViewingService.getAdminViewingMail();
    if (id != null && mail!=null && this.base64String!=null)
    {
      let userUpdate: PassengerUpdateDTO = {
        name: this.ProfileForm.get('name')!.value,
        surname: this.ProfileForm.get('surname')!.value,
        profilePicture: this.base64String,
        telephoneNumber: this.ProfileForm.get('phone')!.value,
        email: mail,
        address: this.ProfileForm.get('address')!.value,
      }
      this.driverService.postDriverChangesNoPassword(id,userUpdate).subscribe(
        { next: (result) => 
          {
            alert("changes saved");
          },
          error: (error) =>
          {
            alert(error);
          }
        }
      );
    }
    
  }

  onPasswordFormSubmit ()
  {
    
    if (this.PasswordForm.get('oldPass')!.value === "")
    {
      alert("missing old password in form!");
      return;
    }
    if (this.PasswordForm.get('newPass')!.value === "")
    {
      alert("missing new password in form!");
      return;
    }

    let id = this.adminViewingService.getAdminViewingId();
    let mail = this.adminViewingService.getAdminViewingMail();
    if (id != null && mail!=null && this.base64String!=null)
    {
      let userUpdate: PasswordChangeDTO = {
        oldPassword: this.PasswordForm.get('oldPass')!.value,
        newPassword: this.PasswordForm.get('newPass')!.value,
      }
      this.driverService.updateDriverPassword(id,userUpdate).subscribe(response => {
        if (response.status === 204) {
            console.log("password changed successfully");
        } else {
            console.log("error changing password");
        }
    });
    }
  }

  onVehicleFormSubmit ()
  {
    
    if (this.VehicleForm.get('model')!.value === "")
    {
      alert("missing model in form!");
      return;
    }
    if (this.VehicleForm.get('plates')!.value === "")
    {
      alert("missing plates in form!");
      return;
    }
    if (this.VehicleForm.get('numberOfSeats')!.value === "")
    {
      alert("missing number of seats in form!");
      return;
    }
    if (this.VehicleForm.get('numberOfSeats')!.value <1)
    {
      alert("invalid number of seats number!");
      return;
    }

    let id = this.adminViewingService.getAdminViewingId();
    let mail = this.adminViewingService.getAdminViewingMail();
    if (id != null && mail!=null && this.base64String!=null)
    {
      this.selectedVehicleType = this.VehicleForm.get("selectedVehicleType")!.value;
      let vehicleUpdate: VehicleChangeDTO = {
        driverId:id,
        vehicleType:this.VehicleForm.get("selectedVehicleType")!.value,
        model:this.VehicleForm.get('model')!.value,
        licenseNumber:this.VehicleForm.get('plates')!.value,
        passengerSeats:this.VehicleForm.get('numberOfSeats')!.value,
        babyTransport:this.drivesBabies,
        petTransport:this.drivesPets
      }
      this.driverService.updateVehicle(id,vehicleUpdate).subscribe(
        { next: (result) => 
          {
            alert("changes saved");
          },
          error: (error) =>
          {
            alert(error);
          }
        }
      );
    }
  }

  onChangePicture(event:any) {
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

