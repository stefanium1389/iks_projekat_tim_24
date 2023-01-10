import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TimeDialogComponent } from '../time-dialog/time-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { BlockDialogComponent } from '../block-dialog/block-dialog.component';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-passenger-profile',
  templateUrl: './passenger-profile.component.html',
  styleUrls: ['./passenger-profile.component.css']
})
export class PassengerProfileComponent implements OnInit {

  isAdmin: boolean = true;

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

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadForms()
  }

  changeProfile ()
  {
    console.log("change called");
  }

  uploadPicture(event: any)
  {
    console.log("picture selected");
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
