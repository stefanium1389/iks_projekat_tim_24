import { Component, OnInit } from '@angular/core';

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

  ngOnInit(): void {
  }

}
