import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatMenu } from '@angular/material/menu';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-admin-create-driver',
  templateUrl: './admin-create-driver.component.html',
  styleUrls: ['./admin-create-driver.component.css']
})
export class AdminCreateDriverComponent implements OnInit {

  constructor() { }

  hasPetDriver:boolean;
  hasBabyDriver:boolean;
  hasPetVehicle:boolean;
  hasBabyVehicle:boolean;
  selectedType:string = "STANDARD";
  isTypeSelected:boolean = false;
  form: FormGroup;
  validFile: boolean = true; //za dokumenat
  pictureReader: FileReader;



  ngOnInit(): void {
  }

  onTypeChange(event:string){



  }

  submit(){
    if(!this.form.valid){
      return;
    }
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
