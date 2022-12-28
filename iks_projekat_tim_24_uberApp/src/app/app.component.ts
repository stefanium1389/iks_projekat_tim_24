import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'iks_projekat_tim_24_uberApp';

  public users: User[] = [];

  constructor(){}

  ngOnInit(): void
  {
  
  }
  
}
