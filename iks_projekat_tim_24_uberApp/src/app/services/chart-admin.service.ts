import { Injectable } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { Observable, of } from 'rxjs';
import { JwtService } from '../components/jwt-service.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, throwError } from 'rxjs';
import { registerLocaleData } from '@angular/common';
import { AdminViewingService } from './admin-viewing.service';
import { ChartRequest, ChartToRender, ChartDTO } from './chart.service';

@Injectable({
  providedIn: 'root'
})
export class ChartAdminService {

  constructor(private adminViewingService: AdminViewingService, private jwtService: JwtService, private http: HttpClient) { }

  public getTypesOfChart() {
    let role = this.jwtService.getRole();

    if (role === "ADMIN") {
      let adminViewingRole = this.adminViewingService.getAdminViewingRole();
      if (adminViewingRole == null) {
        return ["globalni broj vožnji", "globalni broj kilometara", "globalni troškovi"];
      }
      role = adminViewingRole;
    }
    if (role === "DRIVER") {
      return ["broj obavljenih vožnji", "broj voženih kilometara"];
    }
    if (role === "USER") {
      return ["broj vožnji", "broj kilometara", "troškovi"];
    }

    throw new Error("problem in finding the role");

  }

  getChart(chartRequest: ChartRequest): Observable<ChartToRender> {

    if (chartRequest.startDate == null || chartRequest.endDate == null || chartRequest.topic == null)
    {
      console.log("chart request is missing parameters, aborting");
      return new Observable<ChartToRender>;
    }

    let id: number | null;
    let adminViewingId = this.adminViewingService.getAdminViewingId();
    if (adminViewingId == null) {
      id = this.jwtService.getId();
    }
    else {
      id = adminViewingId;
    }

    let addressPiece: string = this.getAddress(chartRequest.topic, id);
    return this.http.post<ChartDTO>(environment.apiBaseUrl + `api/statistics/` + addressPiece, { startDate: chartRequest.startDate, endDate: chartRequest.endDate }).pipe(
      map(result => {
        let chartType: ChartType;
        switch (result.type) {
          case 'pie':
            chartType = 'pie';
            break;
          case 'line':
            chartType = 'line';
            break;
          case 'bar':
            chartType = 'bar';
            break;
          default:
            throw new Error("chart type not found!");
        }

        let leData: ChartData = {
          labels: result.labels,
          datasets: [{
            label: chartRequest.topic,
            data: result.data,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        };

        const response: ChartToRender = {
          data: leData,
          average: result.average,
          total: result.total,
          type: chartType
        };
        return response;
      })
    );
  }

  getAddress(topic: string, id: number | null) {
    let address: string = "";
    switch (topic) {
      case "globalni broj vožnji":
        address = "admin/rides";
        break;
      case 'globalni broj kilometara':
        address = "admin/kilometers";
        break;
      case 'globalni troškovi':
        address = 'admin/expenses';
        break;
      case "broj vožnji":
        address = "passenger/"+id+"/rides";
        break;
      case 'broj kilometara':
        address = "passenger/"+id+"/kilometers";
        break;
      case 'troškovi':
        address = "passenger/"+id+"/expenses";
        break;
      case "broj obavljenih vožnji":
        address = "driver/"+id+"/rides"
        break;
      case 'broj voženih kilometara':
        address = "driver/"+id+"/kilometers";
        break;
      default:
        throw new Error("chart type not found!");
    }
    return address;
  }

}


