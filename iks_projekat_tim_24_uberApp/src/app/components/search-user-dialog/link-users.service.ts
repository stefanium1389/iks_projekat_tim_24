import { Injectable } from '@angular/core';
import { dtoUser } from './search-user-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class LinkUsersService {

  constructor(private snackBar: MatSnackBar) { }
  usersList:dtoUser[] = []

  addUser(user:dtoUser){
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
  removeUser(user:dtoUser){
    this.usersList = this.usersList.filter(function(item) {
      return item !== user;
    })
  }
}
