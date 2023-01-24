import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VehicleDTO } from './DTO/VehicleDTO';

@Injectable({
  providedIn: 'root'
})
export class VehicleDataService {

  constructor(private http: HttpClient) { }

  getVehicleByDriverId(id:number):Observable<VehicleDTO>{
    return this.http.get<VehicleDTO>(environment.apiBaseUrl+`api/vehicle/${id}`);
  }


}
