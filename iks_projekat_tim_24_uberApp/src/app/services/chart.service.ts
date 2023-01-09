import { Injectable } from '@angular/core';
import { ChartType } from 'chart.js';
import { Observable, of } from 'rxjs';

 export interface ChartToRender
{
  type: ChartType;
  data: Array<any>;
  labels: Array<any>;
  options: any;
  total: string;
  average: string;
}

export interface ChartRequest
{
  role: string;
  topic: string;
  startDate: Date;
  endDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

    public getChart( chartRequest: ChartRequest) : Observable<any>
  {
    //procesirati request, ovo je samo neki dummy


     let ChartType : ChartType = 'radar';
     let ChartData : Array<any> = [
      { data: [1000, 2000, 3000], label: 'dunno' }
    ];;
     let ChartLabels: Array<string> = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
     let ChartOptions: any = {
      responsive: true
    };
    let ChartTotal = "-100";
    let ChartAverage = "-50.5";

    if (chartRequest.topic === "kilometri")
    {
      ChartType = 'line';
      ChartData = [
       { data: [100, 590, 800, 810, 560, 550, 400], label: 'pređeni km' }
     ];
    }
    else if (chartRequest.topic === "troškovi")
    {
      ChartType = 'pie';
      ChartData = [
       { data: [1000, 5900, 8005, 8150, 5160, 1550, 2400], label: 'troškovi' }
     ];
    }
    else if (chartRequest.topic === "vožnje")
    {
      ChartType = 'bar';
      ChartData = [
       { data: [1000, 5900, 8005, 8150, 5160, 1550, 2400], label: 'vožnje' }
     ];
    }

    let response : ChartToRender = 
    {
      data : ChartData,
      type : ChartType,
      options : ChartOptions,
      labels : ChartLabels,
      total : ChartTotal,
      average : ChartAverage,
    }

    return of(response);

  }


}


