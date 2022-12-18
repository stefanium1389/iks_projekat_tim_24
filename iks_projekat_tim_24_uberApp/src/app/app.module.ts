import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserService } from './user.service';
import {RegisterComponent} from "./components/register/register.component";
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from 'src/infrastructure/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ButtonComponent } from './components/button/button.component';
import { RouterModule, Routes } from '@angular/router';
import { DriverMainComponent } from './driver-main/driver-main.component';
import { MapModule } from './components/map/map/map.module';
import { RideHistoryModule } from './ride-history/ride-history.module';


const appRoutes : Routes = 
[
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
]

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        NavbarComponent,
        ButtonComponent,
        RegisterComponent,
        DriverMainComponent
    ],
    providers: [UserService],
    bootstrap: [AppComponent],
    imports: [
        MapModule, RideHistoryModule, BrowserModule, HttpClientModule, MaterialModule, NgbModule, RouterModule.forRoot(appRoutes)
    ]
})
export class AppModule { }

