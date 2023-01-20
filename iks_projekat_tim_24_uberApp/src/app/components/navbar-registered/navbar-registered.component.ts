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

  constructor(private jwtService : JwtService, private router: Router, private whService: WorkingHourService, private socketService: SocketService) { }

  ngOnInit(): void {
    this.showDropdown = false;
    this.hasNotification = false; //za sad
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
      this.stompClient.subscribe("/notification/" + this.jwtService.getId(), (message: { body: string; }) => {
        this.handleResult(message);
      });
    }
  }
  
  // Funkcija koja se poziva kada server posalje poruku na topic na koji se klijent pretplatio
  handleResult(message: { body: string; }) {
    if (message.body) {
      let messageResult: Message = JSON.parse(message.body);
      this.messages.push(messageResult);
    }
  }
}
