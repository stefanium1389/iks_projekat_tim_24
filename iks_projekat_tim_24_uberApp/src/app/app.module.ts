import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserService } from './user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from "./components/register/register.component";
import { RegisterNotificationComponent } from "./components/register/register-notification/register-notification.component";
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
import { RideHistoryDriverModule } from './ride-history/ride-history-driver.module';
import { RideHistoryPassengerModule } from './ride-history/ride-history-passenger.module';
import { ResetPasswordComponent } from './components/login/reset-password/reset-password.component';
import { AdminCreateDriverComponent } from './components/admin-create-driver/admin-create-driver.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { RateRideComponent } from './components/rate-ride/rate-ride.component';
import { MapComponent } from './components/map/map/map.component';
import { NotificationModule } from "./components/notification/notification.module";
import { NotificationPageComponent } from './components/notification/notification-page/notification-page.component';
import { NavbarUnregisteredComponent } from './components/navbar-unregistered/navbar-unregistered.component';
import { NavbarRegisteredComponent } from './components/navbar-registered/navbar-registered.component';
import { PassengerProfileComponent } from './components/passenger-profile/passenger-profile.component';
import { DriverProfileComponent } from './components/driver-profile/driver-profile.component';
import { ReportDialogComponent } from './components/report-dialog/report-dialog.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgChartsModule } from 'ng2-charts';
import { BlockDialogComponent } from './components/block-dialog/block-dialog.component';
import { AdminViewUsersComponent } from './components/admin-view-users/admin-view-users.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { AdminMainComponent } from './components/admin-main/admin-main.component';
import { RideHistoryPassengerComponent } from './ride-history/ride-history-passenger/ride-history-passenger.component';
import { RideHistoryDriverComponent } from './ride-history/ride-history-driver/ride-history-driver.component';
import { SearchUserDialogComponent } from './components/search-user-dialog/search-user-dialog.component';
import { JwtInterceptorService } from './components/jwt-interceptor.service';
import { FavouriteRoutesComponent } from "./components/favourite-routes/favourite-routes.component";
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

const appRoutes : Routes =
[
  {path: '', component:UnregisteredUserMainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'notifications', component: NotificationPageComponent},
  {path: 'driver-home', component: DriverMainComponent},
  {path: 'admin-home' , component: AdminMainComponent},
  {path: 'user-home', component: PassengerMainComponent},
  {path: 'user-profile', component: PassengerProfileComponent},
  {path: 'user-ride-history', component: RideHistoryPassengerComponent},
  {path: 'favorite-routes', component: FavouriteRoutesComponent},
  {path:'driver-profile', component: DriverProfileComponent},
  {path:'driver-ride-history', component:RideHistoryDriverComponent},
  {path:'account-management', component:AdminViewUsersComponent},
  {path:'activate', component:VerifyEmailComponent},
  {path:'register-success',component:RegisterNotificationComponent}
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
        PassengerProfileComponent,
        DriverProfileComponent,
        ReportDialogComponent,
        StatisticsComponent,
        BlockDialogComponent,
        AdminViewUsersComponent,
        ProfileCardComponent,
        AdminMainComponent,
        SearchUserDialogComponent,
        FavouriteRoutesComponent,
        VerifyEmailComponent
        
    ],
    providers: [UserService,{
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptorService,
        multi: true
      }],
    bootstrap: [AppComponent],
    imports: [
        MapModule, RideHistoryDriverModule, RideHistoryPassengerModule, BrowserModule, HttpClientModule, MaterialModule, NgbModule, RouterModule.forRoot(appRoutes), ReactiveFormsModule, FormsModule, MatCheckboxModule,
        MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule,
        NotificationModule, MatDatepickerModule, MatNativeDateModule, NgChartsModule,
    ]
})
export class AppModule { }

