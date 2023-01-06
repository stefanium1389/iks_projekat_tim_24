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

    // Line chart configuration
    public lineChartType = 'line';
    public lineChartData: Array<any> = [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Kilometers traveled' }
    ];
    public lineChartLabels: Array<any> = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
    public lineChartOptions: any = {
      responsive: true
    };

  ngOnInit(): void {
  }

  onDateChange()
  {
    console.log(this.startDate, this.endDate);
  }

}
