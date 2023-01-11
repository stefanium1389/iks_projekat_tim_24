import { Component, OnInit } from '@angular/core';
import { JwtService } from '../jwt-service.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-navbar-registered',
  templateUrl: './navbar-registered.component.html',
  styleUrls: ['./navbar-registered.component.css']
})
export class NavbarRegisteredComponent implements OnInit {

  hasNotification : boolean;
  showDropdown : boolean;
  role : string | null;

  constructor(private jwtService : JwtService, private router: Router, private location: Location) { }

  ngOnInit(): void {
    this.showDropdown = false;
    this.hasNotification = false; //za sad
    this.role = this.jwtService.getRole();
  }

  dropdownClick(item : string)
  {
    console.log(item);
  }

  logout()
  {
    this.jwtService.logout();
    this.onClickOption("");
  }

  onClickOption(route : string)
  {
    this.router.navigate([route]).then(() => {
      window.location.reload();
    });
  }

}
