import { Component, OnInit, Input} from '@angular/core';

export interface UserForCard 
{
  isDriver: boolean,
  nameAndSurname: string
}

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})

export class ProfileCardComponent implements OnInit {

  @Input() user: UserForCard;
  constructor() { }

  ngOnInit(): void {
  }

}
