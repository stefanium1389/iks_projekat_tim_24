import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CodeAndPasswordDTO, PasswordResetRequestDTO } from './DTO/resetPasswordDTO';
import { SuccessDTO } from './DTO/SuccessDTO';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor(private http: HttpClient) { }

  sendPasswordResetEmail(dto: PasswordResetRequestDTO):Observable<SuccessDTO>{
    return this.http.post<SuccessDTO>(environment.apiBaseUrl+`api/user/resetPassword`,dto);
  }
  checkResetPassword(dto: CodeAndPasswordDTO):Observable<SuccessDTO>{
    return this.http.put<SuccessDTO>(environment.apiBaseUrl+`api/user/resetPassword`,dto);
  }
}
