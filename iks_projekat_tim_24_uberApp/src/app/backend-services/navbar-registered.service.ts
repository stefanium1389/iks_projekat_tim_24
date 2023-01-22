import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtService } from '../components/jwt-service.service';
import { UserDTO } from './DTO/UserDTO';

@Injectable({
    providedIn: 'root'
})
export class NavbarRegisteredService {
    
    constructor(private http:HttpClient, private jwtService: JwtService) { }
    
    getHasUnread(): Observable<boolean>
    {
        return this.http.get<boolean>(environment.apiBaseUrl+'api/notification/unread');
    }
    
    readNotification(id: number): void
    {
        this.http.put<any>(environment.apiBaseUrl+'api/notification/read/${id}', null);
    }

    getById(id:number):Observable<UserDTO>{
      
        if (this.jwtService.getRole() === 'USER')
        {
            return this.http.get<UserDTO>(environment.apiBaseUrl+`api/passenger/${id}`);
        }
        if (this.jwtService.getRole() === 'DRIVER')
        {
            return this.http.get<UserDTO>(environment.apiBaseUrl+`api/driver/${id}`);
        }
        if (this.jwtService.getRole() === 'ADMIN')
        {
            return this.http.get<UserDTO>(environment.apiBaseUrl+`api/admin/${id}`);
        }
        else
        {
            throw new Error("greška u pronalaženju uloga!");
        }
        
      }
}