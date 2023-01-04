import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-passenger-profile',
  templateUrl: './passenger-profile.component.html',
  styleUrls: ['./passenger-profile.component.css']
})
export class PassengerProfileComponent implements OnInit {

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

  constructor() { }

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

    this.PasswordForm.get('oldPass')?.setValue("sifra");
    this.PasswordForm.get('newPass')?.setValue("sifra");
  }
}
