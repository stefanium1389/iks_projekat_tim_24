import { Component, OnInit } from '@angular/core';
import { JwtService } from '../jwt-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar-registered',
  templateUrl: './navbar-registered.component.html',
  styleUrls: ['./navbar-registered.component.css']
})
export class NavbarRegisteredComponent implements OnInit {

  hasNotification : boolean;
  showDropdown : boolean;
  role : string | null;

  constructor(private jwtService : JwtService, private router: Router) { }

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
    this.router.navigate(['/']);
  }

}
