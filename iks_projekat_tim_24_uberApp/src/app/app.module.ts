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
import { PassengerMainComponent } from './components/passenger-main/passenger-main.component';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TimeDialogComponent } from './components/time-dialog/time-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    DriverMainComponent,
    PassengerMainComponent,
    TimeDialogComponent
  ],
  imports: [
    MapModule, BrowserModule, HttpClientModule, MaterialModule, NgbModule,
     RouterModule.forRoot(appRoutes), FormsModule,MatCheckboxModule,
     MatButtonModule,
     MatDialogModule,
     MatFormFieldModule,
     MatInputModule,
     BrowserAnimationsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
  entryComponents: [TimeDialogComponent]
})
export class AppModule { }

