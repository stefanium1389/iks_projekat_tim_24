import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BlockUserService {
    
    constructor(private http:HttpClient) { }
    
    public putBlock(userId: number): Observable<any>
    {
        return this.http.put<any>(environment.apiBaseUrl+`api/user/${userId}/block`, null);
    }
    
    public putUnblock(userId: number): Observable<any>
    {
        return this.http.put<any>(environment.apiBaseUrl+`api/user/${userId}/unblock`, null);
    }
}