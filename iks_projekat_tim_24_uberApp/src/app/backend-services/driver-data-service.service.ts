import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DTOList } from './DTO/DTOList';
import { RideDTO } from './DTO/RideDTO';
import { UserDTO, UserRegistrationDTO, UserUpdateDTO } from './DTO/UserDTO';
import { VehicleDTO } from './DTO/VehicleDTO';


@Injectable({
  providedIn: 'root'
})
export class DriverDataService {
  

  constructor(private http:HttpClient) { }

  postDriver(dto:UserRegistrationDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(environment.apiBaseUrl+'api/driver', dto); 
  }//                      ^^^^ osigurava da je response body ovog tipa
  getPaginatedDrivers(page:number, size:number): Observable<DTOList<UserDTO>> {
    return this.http.get<DTOList<UserDTO>>(environment.apiBaseUrl+`api/driver?page=${page}&size=${size}`);
  }
  getDriverById(id:number): Observable<UserDTO> {
    return this.http.get<UserDTO>(environment.apiBaseUrl+`api/driver/${id}`);
  }
  putDriverUpdateById(id: number, dto: UserUpdateDTO): Observable<UserDTO>{
    return this.http.put<UserDTO>(environment.apiBaseUrl+`api/driver/${id}`, dto);
  }
  getVehicleByDriverId(id: number): Observable<VehicleDTO> {
    return this.http.get<VehicleDTO>(environment.apiBaseUrl+`api/driver/${id}/vehicle`);
  }
  getDriverRidesPaginated(id:number, page:number,size:number,sort:string,fromDate:string,toDate:string):Observable<DTOList<RideDTO>>{
    return this.http.get<DTOList<RideDTO>>(environment.apiBaseUrl+`api/driver/${id}/ride?page=${page}&size=${size}&sort=${sort}&from=${fromDate}&to=${toDate}`)
  }
}
