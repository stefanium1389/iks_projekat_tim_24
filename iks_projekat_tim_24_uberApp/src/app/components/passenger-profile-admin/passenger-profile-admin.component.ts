import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BlockDialogComponent } from '../block-dialog/block-dialog.component';
import { JwtService } from '../jwt-service.service';
import { defaultPicture } from 'src/app/user';
import { PassengerDataService } from 'src/app/backend-services/passenger-data.service';
import { PassengerUpdateDTO } from 'src/app/backend-services/DTO/UserDTO';
import { PasswordChangeDTO } from 'src/app/backend-services/DTO/UserDTO';
import { AdminViewingService } from 'src/app/services/admin-viewing.service';

@Component({
  selector: 'app-passenger-profile-admin',
  templateUrl: './passenger-profile-admin.component.html',
  styleUrls: ['./passenger-profile-admin.component.css']
})
export class PassengerProfileAdminComponent implements OnInit {

  isAdmin: boolean = true;
  validFile: boolean = true;
  base64String : string | undefined;
  pictureReader: FileReader;

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

  constructor(public dialog: MatDialog, private adminViewingService : AdminViewingService, private passengerService : PassengerDataService) { }

  ngOnInit(): void {
    this.base64String = defaultPicture;
    this.pictureReader = new FileReader();
    this.loadForms();
    this.setReader();
  }

  loadForms()
  {
    let id = this.adminViewingService.getAdminViewingId();
    if (id != null)
    {
      this.passengerService.getPassengerById(id).subscribe(
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
    }
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
