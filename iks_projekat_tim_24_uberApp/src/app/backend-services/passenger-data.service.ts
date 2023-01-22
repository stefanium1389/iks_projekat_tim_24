import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DTOList } from './DTO/DTOList';
import { RideDTO } from './DTO/RideDTO';
import { SuccessDTO } from './DTO/SuccessDTO';
import { UserDTO, UserRegistrationDTO, UserUpdateDTO } from './DTO/UserDTO';
import { PassengerUpdateDTO } from './DTO/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class PassengerDataService {

  constructor(private http: HttpClient) { }
  postPassenger(dto:UserRegistrationDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(environment.apiBaseUrl+'api/passenger', dto); 
  }
  getAllPassengersPaginated(page:number, size:number):Observable<DTOList<UserDTO>> {
    return this.http.get<DTOList<UserDTO>>(environment.apiBaseUrl+`api/passenger?page=${page}&size=${size}`);
  }
  getPassengerById(id:number):Observable<UserDTO>{
    return this.http.get<UserDTO>(environment.apiBaseUrl+`api/passenger/${id}`);
  }
  updatePassenger(id:number, dto:UserUpdateDTO):Observable<UserDTO>{
    return this.http.put<UserDTO>(environment.apiBaseUrl+`api/passenger/${id}`,dto);
  }
  updatePassengerNoPassword(id:number, dto:PassengerUpdateDTO):Observable<UserDTO>{
    return this.http.put<UserDTO>(environment.apiBaseUrl+`api/passenger/${id}`,dto);
  }
  getPassengerRidesPaginated(id:number, page:number,size:number,sort:string,fromDate:string,toDate:string):Observable<DTOList<RideDTO>>{
    return this.http.get<DTOList<RideDTO>>(environment.apiBaseUrl+`api/passenger/${id}/ride?page=${page}&size=${size}&sort=${sort}&from=${fromDate}&to=${toDate}`)
  }
  activatePassenger(activationId:string):Observable<SuccessDTO>{
    return this.http.get<SuccessDTO>(environment.apiBaseUrl+`api/passenger/activate/${activationId}`);
  }
  resendActivationPassenger(activationId:string):Observable<SuccessDTO>{
    return this.http.get<SuccessDTO>(environment.apiBaseUrl+`api/passenger/activate/resend/${activationId}`);
  }
}
