import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { UserService } from './user.service';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from 'src/infrastructure/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ButtonComponent } from './components/button/button.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes : Routes = 
[
  {path: 'login', component: LoginComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LoginComponent,
    NavbarComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, MaterialModule, NgbModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

