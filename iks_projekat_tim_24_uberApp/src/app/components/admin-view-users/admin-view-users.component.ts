import { Component, OnInit } from '@angular/core';
import { UserForCard } from '../profile-card/profile-card.component';

@Component({
  selector: 'app-admin-view-users',
  templateUrl: './admin-view-users.component.html',
  styleUrls: ['./admin-view-users.component.css']
})
export class AdminViewUsersComponent implements OnInit {

  selectedUserType : string;
  searchWord : string;
  users: UserForCard[] = [{isDriver: true, nameAndSurname:"mika mikic"},{isDriver: false, nameAndSurname:"jozef jozic"},{isDriver: true, nameAndSurname:"mika mikic"},{isDriver: false, nameAndSurname:"jozef jozic"}]

  constructor() { }

  ngOnInit(): void {
  }

}
