import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { UserDTO } from 'src/app/backend-services/DTO/UserDTO';



@Injectable({
  providedIn: 'root'
})
export class LinkUsersService {

  constructor(private snackBar: MatSnackBar) { }
  usersList:UserDTO[] = []

  addUser(user:UserDTO){
    for(let xd of this.usersList){
      if(xd){
        if(xd.id == user.id){
          this.snackBar.open('Korisnik je vec dodat!', 'Ok', {
            duration: 3000
          });
          return
        }
      }
    }
    this.usersList.push(user);
    //console.log(this.usersList);
  }
  removeUser(user:UserDTO){
    this.usersList = this.usersList.filter(function(item) {
      return item !== user;
    })
  }
}
