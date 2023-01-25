import { Component, OnInit } from '@angular/core';
import { ChartType, ChartDataset, ChartData } from 'chart.js';
import { ChartAdminService } from 'src/app/services/chart-admin.service';
import {ChartToRender, ChartRequest, ChartService} from  'src/app/services/chart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-statistics-admin',
  templateUrl: './statistics-admin.component.html',
  styleUrls: ['./statistics-admin.component.css']
})
export class StatisticsAdminComponent implements OnInit {

  constructor(private chartService: ChartAdminService,private snackBar: MatSnackBar,) { }

  
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
    this.onChartChange(this.selectedChartType);
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
            this.snackBar.open(error.error.message, 'Ok', {
              duration: 3000
            });
    
          }
        }
        );
  }

  changeChart(chartToRender: ChartToRender) {
    this.ChartData = chartToRender.data;
    this.TypeOfChart = chartToRender.type;
    this.total = "" + chartToRender.total.toFixed(2);
    this.average = "" + chartToRender.average.toFixed(2);
}


}

