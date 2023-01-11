import { Component, OnInit } from '@angular/core';
import { JwtService } from '../jwt-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  companyName : string = "UberApp"
  isLoggedIn: boolean;
  constructor(private jwtService : JwtService) { }

  ngOnInit() {
    this.jwtService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

}
