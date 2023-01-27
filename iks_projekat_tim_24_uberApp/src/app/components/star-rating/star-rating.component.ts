import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})

export class StarRatingComponent {
  @Input() rating: number = 0;
  savedRating:number=0;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter();
  stars: number[] = [1, 2, 3, 4, 5];
  constructor(){

  }
  updateRating(rating: number): void {
    this.rating = rating;
    this.savedRating= rating;
    this.ratingChange.emit(rating);
  }
  hoverStar(rating: number):void{
    this.rating = rating;
  }
  mouseLeave(): void{
    this.rating=this.savedRating;
  }
}
