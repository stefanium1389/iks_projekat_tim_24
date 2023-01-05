import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  constructor() { }

  startDate: Date;
  endDate: Date;

  ngOnInit(): void {
  }

  onDateChange()
  {
    console.log(this.startDate, this.endDate);
  }

}
