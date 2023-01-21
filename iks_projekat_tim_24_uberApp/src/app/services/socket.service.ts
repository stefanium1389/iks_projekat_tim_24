import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import {NotificationDTO} from "../backend-services/DTO/NotificationDTO";

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  url: string = environment.apiBaseUrl + "api/socket";

  constructor(private http: HttpClient) { }

  post(data: NotificationDTO) {
    return this.http.post<NotificationDTO>(this.url, data).pipe(map((data: NotificationDTO) => { return data; }));
  }
}
