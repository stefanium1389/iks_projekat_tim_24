import { Component, OnInit, Input} from '@angular/core';
import { defaultPicture } from 'src/app/user';
import { Output,EventEmitter } from '@angular/core';

/*export interface UserForCard 
{
  isDriver: boolean,
  nameAndSurname: string
}*/

export interface UserForCard 
{
  userId: number;
  role: string,
  nameAndSurname: string
  picture:string|null;
  email:string;
}

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})

export class ProfileCardComponent implements OnInit {

  @Input() user: UserForCard;
  @Output() userClicked = new EventEmitter<UserForCard>();
  constructor() { }

  ngOnInit(): void {
    if (!this.user.picture) {
      this.user.picture = defaultPicture;
    }
  }

  onCardClick() {
    this.userClicked.emit(this.user);
  }

}
