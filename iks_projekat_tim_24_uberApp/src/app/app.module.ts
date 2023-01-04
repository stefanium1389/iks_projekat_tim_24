import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserService } from './user.service';
import { ReactiveFormsModule } from '@angular/forms';
import {RegisterComponent} from "./components/register/register.component";
import {RegisterNotificationComponent} from "./components/register/register-notification/register-notification.component";
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from 'src/infrastructure/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { DriverMainComponent } from './driver-main/driver-main.component';
import { UnregisteredUserMainComponent } from './unregistered-user-main/unregistered-user-main.component';
import { MapModule } from './components/map/map/map.module';
import { PassengerMainComponent } from './components/passenger-main/passenger-main.component';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TimeDialogComponent } from './components/time-dialog/time-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatButton } from '@angular/material/button';
import { RideHistoryModule } from './ride-history/ride-history.module';
import { ResetPasswordComponent } from './components/login/reset-password/reset-password.component';
import { AdminCreateDriverComponent } from './components/admin-create-driver/admin-create-driver.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { RateRideComponent } from './components/rate-ride/rate-ride.component';

import { NotificationModule } from "./components/notification/notification.module";
import { NotificationPageComponent } from './components/notification/notification-page/notification-page.component';
import { NavbarUnregisteredComponent } from './components/navbar-unregistered/navbar-unregistered.component';
import { NavbarRegisteredComponent } from './components/navbar-registered/navbar-registered.component';
import { PassengerProfileComponent } from './components/passenger-profile/passenger-profile.component';

const appRoutes : Routes =
[
  {path: '', component:UnregisteredUserMainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'notifications', component: NotificationPageComponent}
]

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        NavbarComponent,
        RegisterComponent,
        RegisterNotificationComponent,
        DriverMainComponent,
        UnregisteredUserMainComponent,
        PassengerMainComponent,
        TimeDialogComponent,
        ResetPasswordComponent,
        AdminCreateDriverComponent,
        StarRatingComponent,
        RateRideComponent,
        NavbarUnregisteredComponent,
        NavbarRegisteredComponent,
        PassengerProfileComponent
    ],
    providers: [UserService],
    bootstrap: [AppComponent],
    imports: [
        MapModule, RideHistoryModule, BrowserModule, HttpClientModule, MaterialModule, NgbModule, RouterModule.forRoot(appRoutes), ReactiveFormsModule, FormsModule, MatCheckboxModule,
        MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule,
        NotificationModule
    ]
})
export class AppModule { }

