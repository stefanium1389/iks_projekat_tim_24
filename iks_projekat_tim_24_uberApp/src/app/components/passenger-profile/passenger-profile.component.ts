import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BlockDialogComponent } from '../block-dialog/block-dialog.component';
import { JwtService } from '../jwt-service.service';
import { defaultPicture } from 'src/app/user';
import { PassengerDataService } from 'src/app/backend-services/passenger-data.service';
import { PassengerUpdateDTO } from 'src/app/backend-services/DTO/UserDTO';
import { PasswordChangeDTO } from 'src/app/backend-services/DTO/UserDTO';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(public dialog: MatDialog, private jwtService: JwtService,
    private snackBar: MatSnackBar, private passengerService : PassengerDataService) { }

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
            this.snackBar.open(error.error.message, 'Ok', {
              duration: 3000
            });
    
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
      this.snackBar.open("missing name in form!", 'Ok', {
        duration: 3000
      });
      return;
    }
    if (this.ProfileForm.get('surname')!.value === "")
    {
      this.snackBar.open("missing surname in form!", 'Ok', {
        duration: 3000
      });
      return;
    }
    if (this.validFile === false)
    {
      this.snackBar.open("picture not valid!", 'Ok', {
        duration: 3000
      });
      return;
    }
    if (this.ProfileForm.get('phone')!.value === "")
    {
      this.snackBar.open("missing telephone number in form!", 'Ok', {
        duration: 3000
      });
      return;
    } 
    if (this.ProfileForm.get('address')!.value === "")
    {
      this.snackBar.open("missing address in form!", 'Ok', {
        duration: 3000
      });
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
            this.snackBar.open("Profile changed.", 'Ok', {
              duration: 3000
            });
    
          },
          error: (error) =>
          {
            this.snackBar.open(error.error.message, 'Ok', {
              duration: 3000
            });
          }
        }
      );
    }
    
  }

  onPasswordFormSubmit ()
  {
    
    if (this.PasswordForm.get('oldPass')!.value === "")
    {
      this.snackBar.open("missing old password in form!", 'Ok', {
        duration: 3000
      });
      return;
    }
    if (this.PasswordForm.get('newPass')!.value === "")
    {
      this.snackBar.open("missing new password in form!", 'Ok', {
        duration: 3000
      });
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
