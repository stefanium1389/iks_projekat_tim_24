import { Component, OnInit } from '@angular/core';
import { start } from '@popperjs/core';
import { ChartType } from 'chart.js';
import {ChartToRender, ChartRequest, ChartService} from  'src/app/services/chart.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  constructor(private chartService: ChartService) { }

  startDate: Date;
  endDate: Date;
  selectedChartType: string;
  chartTypes : string[] = ["vožnje","kilometri","troškovi"]
  total: string ="-5";
  average: string = "-4.5";

    // Line chart configuration
    public TypeOfChart: ChartType = 'radar';
    public ChartData: Array<any> = [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Kilometers traveled' }
    ];
    public ChartLabels: Array<string> = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
    public ChartOptions: any = {
      responsive: true
    };

  ngOnInit(): void {
  }

  onDateChange()
  {
    console.log(this.startDate, this.endDate);
  }

  onChartChange(option : string)
  {

    let chartRequest = 
    {
      role: "passenger",
      topic: option,
      startDate: this.startDate,
      endDate: this.endDate
    }
    this.chartService.getChart(chartRequest).subscribe((chartToRender: ChartToRender) => {
      this.changeChart(chartToRender);
  });

  }

  changeChart(chartToRender : ChartToRender)
  {
    this.ChartData = chartToRender.data;
    this.ChartLabels = chartToRender.labels;
    this.ChartOptions = chartToRender.options;
    this.TypeOfChart = chartToRender.type;
    this.total = chartToRender.total;
    this.average = chartToRender.average;
  }

}
