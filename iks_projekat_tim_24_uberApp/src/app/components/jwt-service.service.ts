import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { User } from '../user';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private _isLoggedIn = false;
  private _isLoggedInSubject = new Subject<boolean>();
  isLoggedIn$ = this._isLoggedInSubject.asObservable();

  get isLoggedIn() {
    return this._isLoggedIn;
  }

  set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
    this._isLoggedInSubject.next(value);
  }

  setJwt(jwt: string){
    localStorage.setItem('jwt',jwt);
    this.updateLoggedIn();
  }

  getJwt(){
    return localStorage.getItem('jwt');
  }

  updateLoggedIn()
  {
    let role = this.getRole();
    if (role === "DRIVER" || role === "ADMIN" || role==="USER") {
      this.isLoggedIn = true;
    }
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
  }
  constructor() { }
}
