import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtService } from '../components/jwt-service.service';

@Injectable({
  providedIn: 'root'
})
export class DriverAuthGuardService implements CanActivate{

  constructor(private router: Router, private jwtService:JwtService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.jwtService.getRole() != "DRIVER") {
      this.router.navigate(['access-denied']);
      return false;
    }
    return true;
  }
}

