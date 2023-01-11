import { Component, OnInit } from '@angular/core';
import { JwtService } from '../jwt-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  companyName : string = "UberApp"
  isLoggedIn: boolean;
  role: string | null;
  routerLinkHome:string = "";

  constructor(private jwtService : JwtService, private router: Router) {
    this.setRole()
  }

  ngOnInit() {
  }

  checkLoggedIn() 
  {
      if (this.jwtService.getJwt())
      {
        return true;
      }
      return false;
  }

  setRole()
  {
    this.role = this.jwtService.getRole();
    if (this.role === null)
    {
      this.routerLinkHome = "";
    }
    else if (this.role === "USER"){
       this.routerLinkHome = "/user-home";
    }
    else if (this.role === "DRIVER"){
       this.routerLinkHome = "/driver-home";
    }
    else if (this.role === "ADMIN"){
       this.routerLinkHome = "/admin-home";
    }
    else //ovo nije preterano promišljeno xd
    {
      this.routerLinkHome = "";
    }
  }

  onClick()
  {
    this.router.navigate([this.routerLinkHome]).then(() => {
      window.location.reload();
    });
  }

}
