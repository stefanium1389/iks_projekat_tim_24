import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { User } from '../user';

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
      return user.email;
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
  constructor() { }
}
