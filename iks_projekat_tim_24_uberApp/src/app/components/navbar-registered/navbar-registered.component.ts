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


@Component({
  selector: 'app-navbar-registered',
  templateUrl: './navbar-registered.component.html',
  styleUrls: ['./navbar-registered.component.css']
})
export class NavbarRegisteredComponent implements OnInit {

  hasNotification : boolean;
  showDropdown : boolean;
  role : string | null;
  
  private serverUrl = environment.apiBaseUrl + 'socket'
  private stompClient: any;
  isLoaded: boolean = false;

  constructor(private jwtService : JwtService, private router: Router, private whService: WorkingHourService, private navbarRegisteredCall: NavbarRegisteredService) { }

  ngOnInit(): void {
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
      
      let header = document.getElementById("header");
      let div = document.createElement('div');
      div.classList.add("notification");
      
      let h1 = document.createElement('h1');
      h1.textContent = notificationResult.notificationType;
      div.appendChild(h1);
      
      let text = document.createElement('p');
      text.textContent = notificationResult.note;
      div.appendChild(text);
  
      let date = document.createElement('p');
      date.textContent = notificationResult.date;
      date.classList.add("date");
      div.appendChild(date);
      
      let button = document.createElement('button');
      button.textContent = "OK";
      div.appendChild(button);
      
      if(header != null)
        header.appendChild(div);
    }
  }
}
