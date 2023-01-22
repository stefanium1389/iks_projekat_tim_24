import { Component, OnInit } from '@angular/core';
import {NotificationPageService} from "../../../backend-services/notification-page.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NotificationDTO} from "../../../backend-services/DTO/NotificationDTO";

@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.css']
})
export class NotificationPageComponent implements OnInit {
  notifications: NotificationDTO[] = []
  
  constructor(private notificationPageCall: NotificationPageService) { }

  ngOnInit(): void
  {
    this.notificationPageCall.getNotificationsForUser().subscribe({
      next: (result) => {
        this.notifications = result.results;
        for (let i = 0; i < this.notifications.length; i++)
        {
          this.notificationPageCall.readNotification(this.notifications[i].id);
        }
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error(error);
        }
      },
    })
  }
}
