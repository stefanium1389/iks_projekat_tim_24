import { Component, OnInit } from '@angular/core';
import { JwtService } from '../jwt-service.service';
import { Router } from '@angular/router';
import { WorkingHourService } from 'src/app/services/working-hour.service';
import { environment } from '../../../environments/environment';
import { SocketService } from '../../services/socket.service';

// @ts-ignore
import * as Stomp from 'stompjs';
// @ts-ignore
import * as SockJS from 'sockjs-client';
import {NavbarRegisteredService} from "../../backend-services/navbar-registered.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NotificationDTO} from "../../backend-services/DTO/NotificationDTO";
import { PassengerDataService } from 'src/app/backend-services/passenger-data.service';
import { defaultPicture } from 'src/app/user';


@Component({
  selector: 'app-navbar-registered',
  templateUrl: './navbar-registered.component.html',
  styleUrls: ['./navbar-registered.component.css']
})
export class NavbarRegisteredComponent implements OnInit {

  hasNotification : boolean;
  showDropdown : boolean;
  role : string | null;
  notifications: any = [];
  base64String = defaultPicture;
  
  private serverUrl = environment.apiBaseUrl + 'socket'
  private stompClient: any;
  isLoaded: boolean = false;

  constructor(private jwtService : JwtService, private router: Router, private whService: WorkingHourService, private navbarRegisteredCall: NavbarRegisteredService) { }

  ngOnInit(): void {
    this.loadPicture();
    this.showDropdown = false;
    this.navbarRegisteredCall.getHasUnread().subscribe({
      next: (result) => {
        this.hasNotification = result;
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error(error);
          this.hasNotification = false;
        }
      },
    })
    this.role = this.jwtService.getRole();
    
    this.initializeWebSocketConnection();
  }
  
  // Funkcija za otvaranje konekcije sa serverom
  initializeWebSocketConnection() {
    // serverUrl je vrednost koju smo definisali u registerStompEndpoints() metodi na serveru
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    
    this.stompClient.connect({}, function () {
      that.isLoaded = true;
      that.openSocket()
    });
    
  }

  loadPicture()
  {
    let id = this.jwtService.getId();
    if (id != null)
    {
      this.navbarRegisteredCall.getById(id).subscribe(
        {
          next: (result) => 
          {
            if (result.profilePicture !== null)
            {
              this.base64String = result.profilePicture;
            }
          },
          error: (error) =>
          {
            alert(error);
          }
        }
        );
    }
  }

  dropdownClick(item : string)
  {
    console.log(item);
  }

  async logout() {
    console.log(this.role);
    if (this.role === "DRIVER") {
      console.log("logout i whservice")
      await this.whService.onLogout(); //ovde može doći do problema
    }
    this.jwtService.logout();
    this.onClickOption("");
  }
  

  onClickOption(route : string)
  {
    this.router.navigate([route]).then(() => {
      window.location.reload();
    });
  }
  
  // Funkcija za pretplatu na topic /notification/user-id
  openSocket() {
    if (this.isLoaded) {
      this.stompClient.subscribe("/notification/" + this.jwtService.getId(), (notification: { body: string; }) => {
        this.handleResult(notification);
      });
    }
  }
  
  // Funkcija koja se poziva kada server posalje poruku na topic na koji se klijent pretplatio
  handleResult(notification: { body: string; })
  {
    if (notification.body)
    {
      let notificationResult: NotificationDTO = JSON.parse(notification.body);
      this.notifications.push(notificationResult);
    }
  }
  
  buttonOk()
  {
    this.navbarRegisteredCall.readNotification(this.notifications.pop().id).subscribe();
  }
}
