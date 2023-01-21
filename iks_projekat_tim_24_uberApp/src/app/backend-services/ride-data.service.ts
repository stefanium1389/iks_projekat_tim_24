import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DTOList } from './DTO/DTOList';
import { RideDTO, RideRequestDTO } from './DTO/RideDTO';

@Injectable({
  providedIn: 'root'
})
export class RideDataService {

  constructor(private http:HttpClient) { }

  postRide(dto:RideRequestDTO): Observable<RideDTO> {
    return this.http.post<RideDTO>(environment.apiBaseUrl+'api/ride', dto); 
  }
  getRideById(id:number):Observable<RideDTO>{
    return this.http.get<RideDTO>(environment.apiBaseUrl+`api/ride/${id}`);
  }
}
