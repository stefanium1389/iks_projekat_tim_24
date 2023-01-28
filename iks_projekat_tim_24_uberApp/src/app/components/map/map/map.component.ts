import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { MapService } from '../map.service';
import { EventEmitter, Input, Output } from '@angular/core';
import { icon } from 'leaflet';
import {environment} from "../../../../environments/environment";
import {VehicleDTO} from "../../../backend-services/DTO/VehicleDTO";
import {DTOList} from "../../../backend-services/DTO/DTOList";

// @ts-ignore
import * as Stomp from 'stompjs';
// @ts-ignore
import * as SockJS from 'sockjs-client';
import { GeoCoordinateDTO, RouteDTO } from 'src/app/backend-services/DTO/RouteDTO';
import { RideEstimationRequestDTO } from 'src/app/backend-services/DTO/RideDTO';
import { RideDataService } from 'src/app/backend-services/ride-data.service';

export interface TimeAndCost {
  time: number;
  cost: number;
}

export interface LocationInfo {
  name: string;
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})

export class MapComponent implements AfterViewInit {
  private map: L.Map;
  start_location: L.Marker;
  end_location: L.Marker;
  ride_route: L.Routing.Control;
  totalDistance: number;
  totalTime: number;
  locationType: string = "departure";
  
  private vehicleLocations: any[];
  private vehicleMarkers: L.Marker[];
  private carIcon: L.Icon;
  
  private serverUrl = environment.apiBaseUrl + 'socket'
  private stompClient: any;
  isLoaded: boolean = false;
  
  name_of_start_location: string;
  name_of_end_location: string;
  selectedVehicleType: string = "STANDARD";
  
  @Input() disableClick = false;
  @Input() markers: any[];
  @Input() mapType = "EMPTY"; //ALL - sva vozila | RIDE - trenutna voznja | EMPTY - prazna mapa
  @Input() driverId: number | null = null;
  
  @Output() out_timeAndDistance = new EventEmitter<TimeAndCost>();
  
  @Output() out_start_location = new EventEmitter<LocationInfo>();
  @Output() out_end_location = new EventEmitter<LocationInfo>();

  constructor(private mapService: MapService, private rideService: RideDataService) {
  }
  
  ngAfterViewInit(): void {
    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });
    
    L.Marker.prototype.options.icon = DefaultIcon;
    
    this.initMap();
  }
  
  ngOnInit() {
    this.vehicleLocations = [];
    this.vehicleMarkers = [];
    
    this.carIcon = L.icon({
      iconUrl: '../../../../assets/icons/carIcon.png',
      
      iconSize: [20, 20], // size of the icon
      iconAnchor: [10, 10], // point of the icon which will correspond to marker's location
    });
    
    this.initializeWebSocketConnection();
    this.route();
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
  
  private initMap(): void {
    
    this.map = L.map('map', {
      center: [45.2396, 19.8227],
      zoom: 13,
    });
    
    const tiles = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          maxZoom: 18,
          minZoom: 3,
          attribution:
              '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }
    );
    tiles.addTo(this.map);
    
    this.registerOnClick();
    
  }
  
  newIcon = icon({
    iconUrl: String(L.Icon.Default.prototype.options.iconUrl),
    iconAnchor: [12, 45],
  });
  
  search(address: string, which: string): void {
    
    this.mapService.search(address).subscribe({
      next: (result) => {
        //console.log(result);
        console.log(this.start_location);
        if (which === "start") {
          if (this.start_location) {
            this.start_location.removeFrom(this.map);
          }
          this.start_location = L.marker(
              [result[0].lat, result[0].lon], {icon: this.newIcon});
          this.start_location.addTo(this.map).openPopup();
          let info : LocationInfo = 
          {
            name: address,
            lat:result[0].lat,
            lng:result[0].lon,
          }
          this.name_of_start_location = address;
          this.out_start_location.emit(info);//EMITUJ OVDE
          
        } else {
          if (this.end_location) {
            this.end_location.removeFrom(this.map);
          }
          this.end_location = L.marker([result[0].lat, result[0].lon], {icon: this.newIcon});
          this.end_location.addTo(this.map).openPopup();
          let info : LocationInfo = 
          {
            name: address,
            lat:result[0].lat,
            lng:result[0].lon,
          }
          this.name_of_end_location = address;
          this.out_end_location.emit(info);//EMITUJ OVDE
          
        }
        this.route();
      },
      error: () => {
      },
    });
  }
  
  registerOnClick(): void
  {
    if (this.disableClick)
    {
      return;
    }
    
    this.map.on('click', (e: any) => {

      if (this.disableClick) {
        return;
      }

      const coord = e.latlng;
      const lat = coord.lat;
      const lng = coord.lng;
      this.mapService.reverseSearch(lat, lng).subscribe((res) => {
        console.log(res.display_name);
        if (this.locationType === "departure") {
          let info : LocationInfo = 
          {
            name: res.display_name,
            lat:coord.lat,
            lng:coord.lng,
          }
          this.out_start_location.emit(info);
          this.name_of_start_location = res.display_name;
        }
        else {
          let info : LocationInfo = 
          {
            name: res.display_name,
            lat:coord.lat,
            lng:coord.lng,
          }
          this.out_end_location.emit(info);
          this.name_of_end_location = res.display_name;
        }
        
      });
      console.log(
          'You clicked the map at latitude: ' + lat + ' and longitude: ' + lng
      );
      
      if (this.locationType === "departure") {
        if (this.start_location) {
          this.start_location.removeFrom(this.map);
        }
        this.start_location = new L.Marker([lat, lng], {icon: this.newIcon});
        this.start_location.addTo(this.map).openPopup();
      } else {
        if (this.end_location) {
          this.end_location.removeFrom(this.map);
        }
        this.end_location = new L.Marker([lat, lng], {icon: this.newIcon});
        this.end_location.addTo(this.map).openPopup();
      }
      
      this.markers = [];
      if (this.start_location)
      {
        this.markers.push(this.start_location);
      }
      if (this.end_location)
      {
        this.markers.push(this.end_location);
      }
      
      this.route();
      
    });
  }
  
  private createCustomMarker(waypointIndex: number, waypoint: L.Routing.Waypoint, numberOfWaypoints: number) {
    return false
  }
  
  route(): void {
  
    if (this.ride_route) {
      this.ride_route.remove();
    }
    
    if (this.markers.length != 0) {
      
      let myPlan = new L.Routing.Plan([this.start_location.getLatLng(), this.end_location.getLatLng()],
          {
            createMarker: this.createCustomMarker
          })
      
      this.ride_route = L.Routing.control({
        waypoints: [this.start_location.getLatLng(), this.end_location.getLatLng()],
        addWaypoints: false,
        plan: myPlan
      });
      
      this.ride_route.on('routesfound', (e) => {
        
        this.postEstimation();
      });
      
      this.ride_route.addTo(this.map);
    }
  }
  
  postEstimation() {
    let g1: GeoCoordinateDTO =
        {
          address: this.name_of_start_location,
          latitude: this.start_location.getLatLng().lat,
          longitude: this.start_location.getLatLng().lng,
        }
    let g2: GeoCoordinateDTO =
        {
          address: this.name_of_end_location,
          latitude: this.end_location.getLatLng().lat,
          longitude: this.end_location.getLatLng().lng,
        }
    
    let route: RouteDTO =
        {
          departure: g1,
          destination: g2,
        }
    
    let estimation: RideEstimationRequestDTO =
        {
          locations: [route],
          vehicleType: this.selectedVehicleType,
          babyTransport: false,
          petTransport: false
        }
    
    this.rideService.postEstimation(estimation).subscribe(
        {
          next: (result) => {
            this.out_timeAndDistance.emit({time: result.estimatedTimeInMinutes, cost: result.estimatedCost});
          },
          error: (error) => {
            console.log(error.error.message)
          }
        }
    );
  }
  
  ngOnChanges() {
    if (this.start_location) {
      this.start_location.removeFrom(this.map);
    }
  
    if (this.end_location) {
      this.end_location.removeFrom(this.map);
    }
    
    if (this.markers.length > 0) {
      this.start_location = new L.Marker([this.markers[0].lat, this.markers[0].lon], {icon: this.newIcon}).addTo(this.map);
      if(this.markers.length > 1)
        this.end_location = new L.Marker([this.markers[1].lat, this.markers[1].lon], {icon: this.newIcon}).addTo(this.map);
    }
    
    this.route();
  }
  
  // Funkcija za pretplatu na topic /notification/user-id
  openSocket() {
    if (this.isLoaded) {
      this.stompClient.subscribe("/map", (vehicles: { body: string; }) => {
        this.handleResult(vehicles);
      });
    }
  }
  
  // Funkcija koja se poziva kada server posalje poruku na topic na koji se klijent pretplatio
  handleResult(vehiclesList: { body: string; }) {
    
    if (vehiclesList.body) {
      this.vehicleLocations = [];
      let vehiclesResult: DTOList<VehicleDTO> = JSON.parse(vehiclesList.body);
      let vehicles = vehiclesResult.results;
      for (let i = 0; i < vehicles.length; i++) {
        if (this.mapType === "ALL")
          this.vehicleLocations.push(vehicles[i].location);
        else if (this.mapType === "RIDE" && vehicles[i].driverId === this.driverId)
          this.vehicleLocations.push(vehicles[i].location);
      }
    }
    this.drawVehicles();
  }
  
  drawVehicles() {
    for (let i = 0; i < this.vehicleMarkers.length; i++)
      this.vehicleMarkers[i].removeFrom(this.map);
    this.vehicleMarkers = [];
    for (let i = 0; i < this.vehicleLocations.length; i++) {
      let lat = this.vehicleLocations[i].latitude;
      let lng = this.vehicleLocations[i].longitude;
      this.vehicleMarkers[i] = new L.Marker([lat, lng], {icon: this.carIcon});
      this.vehicleMarkers[i].addTo(this.map).openPopup();
    }
  }
}