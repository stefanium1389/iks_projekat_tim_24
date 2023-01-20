import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReviewDTO, ReviewRequestDTO } from './DTO/ReviewDTO';

@Injectable({
  providedIn: 'root'
})
export class ReviewDataService {

  constructor(private http: HttpClient) { }

  postVehicleReview(id:number, dto:ReviewRequestDTO): Observable<ReviewDTO> {
    return this.http.post<ReviewDTO>(environment.apiBaseUrl+`api/review/${id}/vehicle`, dto); 
  }
  postDriverReview(id:number, dto:ReviewRequestDTO): Observable<ReviewDTO> {
    return this.http.post<ReviewDTO>(environment.apiBaseUrl+`api/review/${id}/driver`, dto); 
  }
  getReviewsByDriverId(id:number):Observable<ReviewDTO>{
    return this.http.get<ReviewDTO>(environment.apiBaseUrl+`api/review/driver/${id}`);
  }
  getReviewsByVehicleId(id:number):Observable<ReviewDTO>{
    return this.http.get<ReviewDTO>(environment.apiBaseUrl+`api/review/vehicle/${id}`);
  }
  getReviewsByRideId(id:number):Observable<ReviewDTO>{
    return this.http.get<ReviewDTO>(environment.apiBaseUrl+`api/review/${id}`);
  }
}
