import { Injectable } from '@angular/core';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { User } from '../user';
import { interval, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { loginResponse } from './login/loginResponse';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  REFRESH_THRESHOLD: number = 60;

  setJwt(jwt: string){
    localStorage.setItem('jwt',jwt);
  }
  setRefreshToken(jwt: string){
    localStorage.setItem('refreshToken',jwt);
  }
  getJwt(){
    return localStorage.getItem('jwt');
  }
  getRefreshToken(){
    return localStorage.getItem('refreshToken');
  }
  getExpiration(): Date | null{
    const jwt = this.getJwt();
    if(jwt){
      const expiration = jwtDecode(jwt) as JwtPayload;
      const date: Date = new Date(0);
      if(expiration.exp){
        date.setUTCSeconds(expiration.exp);
      return date;
      }
      return null;
    }
    return null;
  }

  getEmail() : string | null{
    const jwt = this.getJwt();
    if(jwt){
      const user = jwtDecode(jwt) as User;
      return user.sub; 
    }
    return null;
  }

  getRole() : string | null{
    const jwt = this.getJwt();
    if(jwt){
      const user = jwtDecode(jwt) as User;
      return user.role;
    }
    return null;
  }

  getId() : number | null{
    const jwt = this.getJwt();
    if(jwt){
      const user = jwtDecode(jwt) as User;
      return user.id;
    }
    return null;
  }
  logout(){
    localStorage.removeItem('jwt');
    localStorage.removeItem('refreshToken');
    console.log("jwt je obrisan")
  }

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    interval(60000).subscribe(() => {
      if(this.getJwt()){
        if(this.isTokenExpiredOrAboutToExpire()){
          //alert('posluku porati')
          this.refreshToken();
        }
      }
  });

   }

  async refreshToken() {
    try {
    const token = this.getRefreshToken();
    
    const response = await this.http.post(environment.apiBaseUrl+'api/refreshAccessToken', {refreshToken:token}).toPromise() as loginResponse;
    this.setJwt(response.accessToken);
    this.setRefreshToken(response.refreshToken);
    
    }
    catch (error) {
      if (error instanceof HttpErrorResponse) {
        this.snackBar.open(error.error.message, 'Ok', {
          duration: 3000
        });
        this.logout();
      }  
    }
  };

  isTokenExpiredOrAboutToExpire(): boolean {
    const token = this.getJwt();
    if (!token) {
        return true;
    }
    const expiration = this.getExpiration();
    if (!expiration) {
        return true;
    }
    const threshold = new Date().getTime() + this.REFRESH_THRESHOLD * 1000;
    return threshold > expiration.getTime();
  }

  

}
