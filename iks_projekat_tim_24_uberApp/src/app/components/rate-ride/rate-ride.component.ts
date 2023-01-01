import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rate-ride',
  templateUrl: './rate-ride.component.html',
  styleUrls: ['./rate-ride.component.css']
})
export class RateRideComponent implements OnInit {

  vozacRating:number=0;
  voziloRating:number=0;

  constructor() { }

  ngOnInit(): void {
  }

}
