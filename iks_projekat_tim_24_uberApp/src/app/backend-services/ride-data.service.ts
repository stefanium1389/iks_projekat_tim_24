import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DTOList } from './DTO/DTOList';
import { FavoriteRideDTO, FavoriteRideResponseDTO } from './DTO/FavoriteRideDTO';
import { ReasonDTO, RejectionDTO } from './DTO/RejectionDTO';
import { RideDTO, RideRequestDTO } from './DTO/RideDTO';
import { SuccessDTO } from './DTO/SuccessDTO';
import { RideEstimationRequestDTO } from './DTO/RideDTO';
import { EstimationDTO } from './DTO/RideDTO';

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
  getActiveDriverRide(driverId:number):Observable<RideDTO>{
    return this.http.get<RideDTO>(environment.apiBaseUrl+`api/ride/driver/${driverId}/active`);
  }
  getActivePassengerRide(passengerId:number):Observable<RideDTO>{
    return this.http.get<RideDTO>(environment.apiBaseUrl+`api/ride/passenger/${passengerId}/active`);
  }
  putWithdrawRide(rideId:number):Observable<RideDTO>{
    return this.http.put<RideDTO>(environment.apiBaseUrl+`api/ride/${rideId}/withdraw`,{});
  }
  putStartRide(rideId:number):Observable<RideDTO>{
    return this.http.put<RideDTO>(environment.apiBaseUrl+`api/ride/${rideId}/start`,{});
  }
  putAcceptRide(rideId:number):Observable<RideDTO>{
    return this.http.put<RideDTO>(environment.apiBaseUrl+`api/ride/${rideId}/accept`,{});
  }
  putEndRide(rideId:number):Observable<RideDTO>{
    return this.http.put<RideDTO>(environment.apiBaseUrl+`api/ride/${rideId}/end`,{});
  }
  putCancelRide(rideId:number, dto: ReasonDTO):Observable<RideDTO>{
    return this.http.put<RideDTO>(environment.apiBaseUrl+`api/ride/${rideId}/cancel`,dto);
  }
  putPanicRide(rideId:number, dto: ReasonDTO):Observable<RideDTO>{
    return this.http.put<RideDTO>(environment.apiBaseUrl+`api/ride/${rideId}/panic`,dto);
  }
  postFavoriteRide(dto:FavoriteRideDTO): Observable<FavoriteRideResponseDTO>{
    return this.http.post<FavoriteRideResponseDTO>(environment.apiBaseUrl+`api/ride/favorites`,dto);
  }
  getFavorites(): Observable<FavoriteRideResponseDTO[]>{
    return this.http.get<FavoriteRideResponseDTO[]>(environment.apiBaseUrl+`api/ride/favorites`);
  }
  deleteFavorite(id:number):Observable<SuccessDTO>{
    return this.http.delete<SuccessDTO>(environment.apiBaseUrl+`api/ride/favorites/${id}`);
  }
  postEstimation(dto:RideEstimationRequestDTO): Observable<EstimationDTO> {
    return this.http.post<EstimationDTO>(environment.apiBaseUrl+'api/unregisteredUser/', dto); 
  }
}
