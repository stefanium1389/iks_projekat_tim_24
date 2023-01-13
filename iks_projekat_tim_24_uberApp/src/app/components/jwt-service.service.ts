import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { User } from '../user';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  setJwt(jwt: string){
    localStorage.setItem('jwt',jwt);
  }

  getJwt(){
    return localStorage.getItem('jwt');
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
    console.log("jwt je obrisan")
  }
  constructor() { }
}
