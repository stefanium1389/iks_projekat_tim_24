import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  setJwt(jwt: string){
    localStorage.setItem('jwt',jwt);
    //console.log("TOKEN SET: ",jwt);
  }
  getJwt(){
    return localStorage.getItem('jwt');
  }
  constructor() { }
}
