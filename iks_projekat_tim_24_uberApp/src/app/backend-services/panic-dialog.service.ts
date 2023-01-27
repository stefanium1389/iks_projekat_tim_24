import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {ReasonDTO} from "./DTO/ReasonDTO";

@Injectable({
    providedIn: 'root'
})
export class PanicDialogService {
    
    constructor(private http:HttpClient) { }
    
    public putPanic(rideId: number, reasonDTO: ReasonDTO): Observable<any>
    {
        return this.http.put<any>(environment.apiBaseUrl+`api/ride/${rideId}/panic`, reasonDTO);
    }
}