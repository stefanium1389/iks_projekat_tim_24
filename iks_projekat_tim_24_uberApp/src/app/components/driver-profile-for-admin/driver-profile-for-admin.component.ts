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
import { DriverChangeDTO } from 'src/app/backend-services/DTO/DriverChangeDTO';
import { Router } from '@angular/router';
import {BlockUserService} from "../../backend-services/block-user.service";

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
  
  userId: number;
  blocked: boolean;
  blockButtonText: string;
  
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
  thereIsChange:boolean = false;
  change: DriverChangeDTO;

  constructor(public dialog: MatDialog, private blockService: BlockUserService, private adminViewingService: AdminViewingService, private driverService : DriverDataService, private router:Router) { }

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
    this.getChanges(); //get profile ce se pozvati sam ako nema izmena
    this.getVehicleData();
  }

  getChanges()
  {
    let id = this.adminViewingService.getAdminViewingId();
    if (id != null)
    {
      this.driverService.getLatestDriverChange(id).subscribe(
        {
          next: (result) => 
          {
            this.change = result;
            this.thereIsChange = true;
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
            this.thereIsChange=false;
            this.getProfileData();
          }
        }
        );
    }
  }

  getVehicleData()
  {
    let id = this.adminViewingService.getAdminViewingId();
    if (id != null){
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

  getProfileData()
  {
    let id = this.adminViewingService.getAdminViewingId();
    if (id != null){
      this.userId = id;
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
  
          this.blocked = result.blocked;
          if(this.blocked)
          {
            this.blockButtonText = "Unblock";
          }
          else
          {
            this.blockButtonText = "Block";
          }
        },
        error: (error) =>
        {
          alert(error);
        }
      }
      );
    }
  }

  saveChanges()
  {
    let id = this.adminViewingService.getAdminViewingId();
    if (id != null){
    this.driverService.acceptChange(this.change.id).subscribe(
      {
        next: (result) => 
        {
          alert("Change accepted.");
          this.thereIsChange = false;
        },
        error: (error) =>
        {
          alert(error);
        }
      }
      );
    }
  }

  denyChanges()
  {
    let id = this.adminViewingService.getAdminViewingId();
    if (id != null){
    this.driverService.declineChange(this.change.id).subscribe(
      {
        next: (result) => 
        {
          alert("Change declined.");
          this.getProfileData();
          this.thereIsChange = false;
        },
        error: (error) =>
        {
          alert(error);
        }
      }
      );
    }
  }
  
  block()
  {
    if(this.blocked)
    {
      this.blockService.putUnblock(this.userId).subscribe();
      this.blocked = false;
      this.blockButtonText = "Block";
    }
    else
    {
      this.blockService.putBlock(this.userId).subscribe();
      this.blocked = true;
      this.blockButtonText = "Unblock";
    }
  }

  onRouting(route : string)
  {
    this.router.navigate([route]).then(() => {
      window.location.reload();
    });
  }



}

