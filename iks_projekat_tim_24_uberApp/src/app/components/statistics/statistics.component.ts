import { Component, OnInit } from '@angular/core';
import { ChartType, ChartDataset, ChartData } from 'chart.js';
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
  chartTypes : string[] | undefined = this.chartService.getTypesOfChart();
  total: string ="";
  average: string = "";

    // Line chart configuration
    public TypeOfChart: ChartType;
    public ChartData: ChartData;
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
      topic: option,
      startDate: this.startDate,
      endDate: this.endDate
    }

      this.chartService.getChart(chartRequest).subscribe(
        {
          next: (result) => 
          {
            this.changeChart(result);
          },
          error: (error) =>
          {
            console.error(error);
          }
        }
        );
  }

  changeChart(chartToRender: ChartToRender) {
    this.ChartData = chartToRender.data;
    this.TypeOfChart = chartToRender.type;
    this.total = "" + chartToRender.total;
    this.average = "" + chartToRender.average;
}


}

