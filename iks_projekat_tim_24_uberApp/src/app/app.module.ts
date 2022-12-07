import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { UserService } from './user.service';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from 'src/infrastructure/material.module';



@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, MaterialModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

