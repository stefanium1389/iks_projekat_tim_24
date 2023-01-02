import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification/notification.component';
import { NotificationPageComponent } from './notification-page/notification-page.component';



@NgModule({
  declarations: [
    NotificationComponent,
    NotificationPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NotificationComponent,
    NotificationPageComponent
  ]
})
export class NotificationModule { }
