import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BlockDialogComponent } from '../block-dialog/block-dialog.component';
import { HttpClient } from '@angular/common/http';
import { JwtService } from '../jwt-service.service';
import { defaultPicture } from 'src/app/user';
import { PassengerDataService } from 'src/app/backend-services/passenger-data.service';
import { PassengerUpdateDTO } from 'src/app/backend-services/DTO/UserDTO';
import { PasswordChangeDTO } from 'src/app/backend-services/DTO/UserDTO';

@Component({
  selector: 'app-passenger-profile',
  templateUrl: './passenger-profile.component.html',
  styleUrls: ['./passenger-profile.component.css']
})
export class PassengerProfileComponent implements OnInit {

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

  constructor(public dialog: MatDialog, private http: HttpClient, private jwtService: JwtService, private passengerService : PassengerDataService) { }

  ngOnInit(): void {
    this.base64String = defaultPicture;
    this.pictureReader = new FileReader();
    this.loadForms();
    this.setReader();
  }

  loadForms()
  {
    let id = this.jwtService.getId();
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

    let id = this.jwtService.getId();
    let mail = this.jwtService.getEmail();
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
      this.passengerService.updatePassengerNoPassword(id,userUpdate).subscribe(
        { next: (result) => 
          {
            alert("profile changed");
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

    let id = this.jwtService.getId();
    let mail = this.jwtService.getEmail();
    if (id != null && mail!=null && this.base64String!=null)
    {
      let userUpdate: PasswordChangeDTO = {
        oldPassword: this.PasswordForm.get('oldPass')!.value,
        newPassword: this.PasswordForm.get('newPass')!.value,
      }
      this.passengerService.updatePassengerPassword(id,userUpdate).subscribe(response => {
        if (response.status === 204) {
            console.log("password changed successfully");
        } else {
            console.log("error changing password");
        }
    });
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
