import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {DTOList} from "./DTO/DTOList";
import {NotificationDTO} from "./DTO/NotificationDTO";

@Injectable({
    providedIn: 'root'
})
export class NotificationPageService {
    
    constructor(private http:HttpClient) { }
    
    getNotificationsForUser(): Observable<DTOList<NotificationDTO>>
    {
        return this.http.get<DTOList<NotificationDTO>>(environment.apiBaseUrl+'api/notification');
    }
    
    readNotification(id: number): void
    {
        this.http.get<any>(environment.apiBaseUrl + `api/notification/read/1`);
    }
}