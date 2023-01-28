import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { DriverAuthGuardService } from './driver-auth-guard.service';
import { UserAuthGuardService } from './user-auth-guard.service';
import { LoggedInAuthGuardService } from './logged-in-auth-guard.service';
import { DeniedAccessComponent } from './denied-access/denied-access.component';


@NgModule({
  declarations: [
    DeniedAccessComponent
  ],
  providers:[AdminAuthGuardService,DriverAuthGuardService,UserAuthGuardService,LoggedInAuthGuardService],
  imports: [
    CommonModule
  ]
})
export class AuthGuardModule { }
