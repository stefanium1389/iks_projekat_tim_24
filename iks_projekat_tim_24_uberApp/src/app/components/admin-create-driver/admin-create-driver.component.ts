import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DriverDataService } from 'src/app/backend-services/driver-data-service.service';
import { UserRegistrationDTO } from 'src/app/backend-services/DTO/UserDTO';
import { VehicleRequestDTO } from 'src/app/backend-services/DTO/VehicleDTO';
import { VehicleDataService } from 'src/app/backend-services/vehicle-data.service';
import {ConsoleLogger} from "@angular/compiler-cli";
import {matchPasswords, properMail} from "../register/register.component";

@Component({
  selector: 'app-admin-create-driver',
  templateUrl: './admin-create-driver.component.html',
  styleUrls: ['./admin-create-driver.component.css']
})
export class AdminCreateDriverComponent implements OnInit {

  constructor(private driverDataService:DriverDataService, private vehicleDataService:VehicleDataService, public snackBar:MatSnackBar) {

    this.form = new FormGroup({
      name: new FormControl('',Validators.required),
      lastname: new FormControl('', Validators.required),
      address: new FormControl('',Validators.required),
      phone: new FormControl('',Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      vehicle_model: new FormControl('', Validators.required),
      vehicle_license: new FormControl('', Validators.required),
      vehicle_detail: new FormControl('', [Validators.required, Validators.min(1), Validators.max(10)]),
      babyVehicle: new FormControl(''),
      petsVehicle: new FormControl('')
    });
  }
  
  hasPetVehicle:boolean = false;
  hasBabyVehicle:boolean = false;
  selectedType:string = "STANDARD";
  form: FormGroup;
  validFile: boolean = true; //za dokumenat, ako budem imao vremena
  pictureReader: FileReader;


  ngOnInit(): void {

  }

  submit(){
    // for (let el in this.form.controls) { //zgodno za debugovanje nevalidnih formi
    //   if (this.form.controls[el].errors) {
    //     console.log(el)
    //   }
    // }
  
    if(!this.form.valid){
      return;
    }
    
    const driverDto: UserRegistrationDTO = {
      name: this.form.get('name')?.value,
      surname: this.form.get('lastname')?.value,
      profilePicture: null,
      telephoneNumber: this.form.get('phone')?.value,
      email: this.form.get('email')?.value,
      address: this.form.get('address')?.value,
      password: '1234'
    }
    const vehicleDto: VehicleRequestDTO = {
      vehicleType: this.selectedType,
      model: this.form.get('vehicle_model')?.value,
      licenseNumber: this.form.get('vehicle_license')?.value,
      currentLocation: {
        address:"Tek kreiran",
        latitude:45.248924272662464,
        longitude:19.838440668950827
      },
      passengerSeats:this.form.get('vehicle_detail')?.value,
      babyTransport:this.form.get('babyVehicle')?.value,
      petTransport:this.form.get('petsVehicle')?.value
    }

    console.log(vehicleDto);
    this.driverDataService.postDriver(driverDto).subscribe({
      next: (result) => {
        let driverId = result.id;
        this.vehicleDataService.postVehicle(driverId, vehicleDto).subscribe({
          next: (result) => {
            this.snackBar.open('Uspesno dodat novi vozac!', 'Ok', {
              duration: 3000
            });
          },
          error: (error) => {
                this.snackBar.open(error.error.message, 'Ok', {
              duration: 3000
            });
          }
        })
      },
      error: (error) => {
            this.snackBar.open(error.error.message, 'Ok', {
          duration: 3000
        });
      }
    })
  }

  onChangePicture(event:any) {
    const file = event.target.files[0];
    if (file.type.split('/')[0] !== 'image') {
     this.validFile = false;
    }
     this.pictureReader.readAsDataURL(file);
   }

   options = [
    { value: 'STANDARD', label: 'Standardno' },
    { value: 'LUXURY', label: 'Luksuzno' },
    { value: 'VAN', label: 'Kombi' },
    ];

  onChange(event: any) {
    this.selectedType = event.target.value;
  }
}
