import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { User } from "./user";

@Injectable({
    providedIn:'root'
})
export class UserService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiServerUrl}/user/all`)
    }

    public addUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.apiServerUrl}/user/add`,user)
    }
    public getUser(userId: number): Observable<User> {
        return this.http.get<User>(`${this.apiServerUrl}/find/${userId}`)
    }
}