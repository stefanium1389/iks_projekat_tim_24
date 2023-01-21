import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class NavbarRegisteredService {
    
    constructor(private http:HttpClient) { }
    
    getHasUnread(): Observable<boolean> {
        return this.http.get<boolean>(environment.apiBaseUrl+'api/notification/unread');
    }
    
}