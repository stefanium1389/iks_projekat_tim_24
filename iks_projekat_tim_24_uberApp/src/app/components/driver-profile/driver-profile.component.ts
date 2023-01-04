import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-driver-profile',
  templateUrl: './driver-profile.component.html',
  styleUrls: ['./driver-profile.component.css']
})
export class DriverProfileComponent implements OnInit {

  vehicleTypes : String[] = ["ford fiesta", "audi a4", "bugati chiron","ford fiesta", "audi a4", "bugati chiron","ford fiesta", "audi a4", "bugati chiron",]
  drivesBabies : boolean = true;
  drivesPets : boolean = true;

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

  VehicleForm = new FormGroup({
    plates: new FormControl(),
    numberOfSeats: new FormControl(),
    drivesBabies: new FormControl(),
    drivesPets: new FormControl()
  });

  constructor() { }

  ngOnInit(): void {
    this.loadForms()
  }

  changeProfile ()
  {
    console.log("change called");
  }
  changeVehicle ()
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
}

