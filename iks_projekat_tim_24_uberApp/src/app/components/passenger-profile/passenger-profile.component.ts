import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TimeDialogComponent } from '../time-dialog/time-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { BlockDialogComponent } from '../block-dialog/block-dialog.component';
import { ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtService } from '../jwt-service.service';
import { environment } from 'src/environments/environment';

export interface PassengerGetResponse
{
  name: string,
  surname: string,
  profilePicture: string,
  telephoneNumber: string,
  email: string,
  address: string
}

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
    city: new FormControl()
  });

  PasswordForm = new FormGroup({
    oldPass: new FormControl(),
    newPass: new FormControl(),
  });

  constructor(public dialog: MatDialog, private http: HttpClient, private jwtService: JwtService) { }

  ngOnInit(): void {
    this.pictureReader = new FileReader();
    this.loadForms();
    this.setReader();
    this.getAndSetProfilePicture();
  }

  getAndSetProfilePicture()
  { 
    
    this.http.get<PassengerGetResponse>(`${environment.apiBaseUrl}api/passenger/${this.jwtService.getId()}`)
        .subscribe(
            response => { this.changePicture(response); },
            error => { console.log(error); }
        );
  }

  changeProfile ()
  {
    console.log("change called");
  }

  changePicture(response : PassengerGetResponse)
  {
    if (response.profilePicture === null)
    {
      console.log("todo: postavi default sliku ako nema nijedne");
    }
    this.base64String = response.profilePicture;
  }

  uploadPicture(event:any) {
    const file = event.target.files[0];
    if (file.type.split('/')[0] !== 'image') {
     this.validFile = false;
    }
     this.pictureReader.readAsDataURL(file);
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
        console.log(this.base64String);
      }
      
   };
   }

  loadForms()
  {
    this.ProfileForm.get('name')?.setValue("Ime1");
    this.ProfileForm.get('surname')?.setValue("Prezime1");
    this.ProfileForm.get('address')?.setValue("Adresa1");
    this.ProfileForm.get('city')?.setValue("Grad1");
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
