import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-driver-main',
  templateUrl: './driver-main.component.html',
  styleUrls: ['./driver-main.component.css']
})
export class DriverMainComponent implements OnInit {

  inRide:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }
  startRide(){
    this.inRide=true;
  }
  stopRide(){
    this.inRide=false;
  }
  panic(){
    alert("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  }
}
