import { HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DTOList } from './DTO/DTOList';
import { RideDTO } from './DTO/RideDTO';
import { UserCardDTO, UserDTO, UserRegistrationDTO, UserUpdateDTO } from './DTO/UserDTO';
import { VehicleDTO } from './DTO/VehicleDTO';
import { PassengerUpdateDTO } from './DTO/UserDTO';
import { PasswordChangeDTO } from './DTO/UserDTO';
import { DriverChangeDTO } from './DTO/DriverChangeDTO';
import { VehicleChangeDTO } from './DTO/VehicleDTO';


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
  postDriverChangesNoPassword(id:number, dto:PassengerUpdateDTO):Observable<DriverChangeDTO>{
    console.log(dto.name);
    return this.http.post<DriverChangeDTO>(environment.apiBaseUrl+`api/driver/${id}`,dto);
  }
  updateDriverPassword(id: number, dto: PasswordChangeDTO): Observable<HttpResponse<any>> {
    return this.http.put<HttpResponse<any>>(environment.apiBaseUrl + `api/user/${id}/changePassword`, dto, { observe: 'response' });
  }
  updateVehicle(driverId: number, dto: VehicleChangeDTO): Observable<VehicleDTO> {
    return this.http.put<VehicleDTO>(environment.apiBaseUrl + `api/vehicle/${driverId}`, dto);
  }
  getVehicle(driverId: number): Observable<VehicleDTO> {
    return this.http.get<VehicleDTO>(environment.apiBaseUrl + `api/vehicle/${driverId}`);
  }
  searchDrivers(key:string):Observable<DTOList<UserCardDTO>> {
    return this.http.get<DTOList<UserCardDTO>>(environment.apiBaseUrl+ `api/driver/search?key=${key}`);
  }
}
