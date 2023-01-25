import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatMenu } from '@angular/material/menu';
import { MatMenuModule } from '@angular/material/menu';
import { GeoCoordinateDTO } from 'src/app/backend-services/DTO/RouteDTO';
import { UserRegistrationDTO } from 'src/app/backend-services/DTO/UserDTO';
import { VehicleRequestDTO } from 'src/app/backend-services/DTO/VehicleDTO';

@Component({
  selector: 'app-admin-create-driver',
  templateUrl: './admin-create-driver.component.html',
  styleUrls: ['./admin-create-driver.component.css']
})
export class AdminCreateDriverComponent implements OnInit {

  constructor() {

    this.form = new FormGroup({
      name: new FormControl('',Validators.required),
      lastname: new FormControl('', Validators.required),
      address: new FormControl('',Validators.required),
      phone: new FormControl('',Validators.required), 
      email: new FormControl('', Validators.required),
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
      console.log('nevalidno!');
      return;
    }

    const loc:GeoCoordinateDTO = {
      address:'Tek kreiran',
      latitude:45.248924272662464,
      longitude:19.838440668950827
    }

    const driverDto: UserRegistrationDTO = {
      name: this.form.get('name')?.value,
      surname: this.form.get('lastname')?.value,
      profilePicture: 'xdBro',
      telephoneNumber: this.form.get('phone')?.value,
      email: this.form.get('email')?.value,
      address: this.form.get('address')?.value,
      password: '1234'
    }
    const vehicleDto: VehicleRequestDTO = {
      vehicleType: this.selectedType,
      model: this.form.get('vehicle_model')?.value,
      licenseNumber: this.form.get('vehicle_license')?.value,
      currentLocation: loc,
      passengerSeats:this.form.get('vehicle_detail')?.value,
      babyTransport:this.form.get('babyVehicle')?.value,
      petTransport:this.form.get('petsVehicle')?.value
    }
    console.log(driverDto)
    console.log(vehicleDto)
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
