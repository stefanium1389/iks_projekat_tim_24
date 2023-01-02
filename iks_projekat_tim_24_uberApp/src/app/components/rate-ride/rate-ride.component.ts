import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rate-ride',
  templateUrl: './rate-ride.component.html',
  styleUrls: ['./rate-ride.component.css']
})
export class RateRideComponent implements OnInit {

  vozacRating:number=0;
  voziloRating:number=0;
  vehicle:string="Ford Mondeo";
  driver:string="Ime Prezime";


  constructor() { }

  ngOnInit(): void {
  }

  vozacRatingFunc(rating: number){
    this.vozacRating=rating;
  }
  voziloRatingFunc(rating: number){
    this.voziloRating=rating;
  }

  confirm(){
    console.log(this.vozacRating);
    console.log(this.voziloRating);
  }
  back(){
    
  }

}
