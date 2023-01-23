import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PanicDialogService {
    
    constructor(private http:HttpClient) { }
    
    public putPanic(rideId: number, reason: string): Observable<any>
    {
        return this.http.put<any>(environment.apiBaseUrl+`api/ride/${rideId}/panic`, '{"reason": "' + reason + '"}');
    }
}