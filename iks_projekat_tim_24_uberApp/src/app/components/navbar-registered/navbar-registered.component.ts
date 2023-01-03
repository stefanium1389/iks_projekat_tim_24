import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-registered',
  templateUrl: './navbar-registered.component.html',
  styleUrls: ['./navbar-registered.component.css']
})
export class NavbarRegisteredComponent implements OnInit {

  hasNotification : boolean = false;
  showDropdown : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  dropdownClick(item : string)
  {

  }

}
