import { Component, OnInit } from '@angular/core';
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
  selectedType:string;
  isTypeSelected:boolean = false;

  ngOnInit(): void {
  }

  onTypeChange(event:string){

  }
}
