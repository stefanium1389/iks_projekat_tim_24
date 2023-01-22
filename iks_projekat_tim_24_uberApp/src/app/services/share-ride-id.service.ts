import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareRideIdService {

  rideId:number;
  constructor() {
   }
   setRideId(id:number){
    this.rideId = id;
   }
   getRideId(){
    return this.rideId;
   }
}
