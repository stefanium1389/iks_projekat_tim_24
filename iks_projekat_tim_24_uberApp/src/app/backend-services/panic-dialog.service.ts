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
    
    public putPanic(rideId: number, reason: string): Observable<any>
    {
        let reasonDTO:ReasonDTO = {reason: reason};
        return this.http.put<any>(environment.apiBaseUrl+`api/ride/${rideId}/panic`, reasonDTO);
    }
}