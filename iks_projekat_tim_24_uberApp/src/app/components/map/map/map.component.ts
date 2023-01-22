import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { MapService } from '../map.service';
import { EventEmitter, Input, Output } from '@angular/core';
import { icon } from 'leaflet';

export interface TimeAndDistance {
  time: number;
  distance: number;
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

  @Input() disableClick = false;
  @Input() markers: any[];

  @Output() out_timeAndDistance = new EventEmitter<TimeAndDistance>();
  @Output() out_start_location = new EventEmitter<string>();
  @Output() out_end_location = new EventEmitter<string>();

  constructor(private mapService: MapService) {
  }

  ngAfterViewInit(): void {
    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    
    this.initMap();
  }

  ngOnInit() {
    this.route();
  }

  ngOnDestroy() {
    
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
            [result[0].lat, result[0].lon], { icon: this.newIcon });
          this.start_location.addTo(this.map).openPopup();
        }
        else {
          if (this.end_location) {
            this.end_location.removeFrom(this.map);
          }
          this.end_location = L.marker([result[0].lat, result[0].lon], { icon: this.newIcon });
          this.end_location.addTo(this.map).openPopup();
        }
        this.route();
      },
      error: () => { },
    });
  }

  registerOnClick(): void {
    
    if(this.disableClick){
      return;
    }

    this.map.on('click', (e: any) => {
      const coord = e.latlng;
      const lat = coord.lat;
      const lng = coord.lng;
      this.mapService.reverseSearch(lat, lng).subscribe((res) => {
        console.log(res.display_name);
        if (this.locationType === "departure") {
          this.out_start_location.emit(res.display_name);
        }
        else {
          this.out_end_location.emit(res.display_name);
        }

      });
      console.log(
        'You clicked the map at latitude: ' + lat + ' and longitude: ' + lng
      );

      if (this.locationType === "departure") {
        if (this.start_location) {
          this.start_location.removeFrom(this.map);
        }
        this.start_location = new L.Marker([lat, lng], { icon: this.newIcon });
        this.start_location.addTo(this.map).openPopup();
      }
      else {
        if (this.end_location) {
          this.end_location.removeFrom(this.map);
        }
        this.end_location = new L.Marker([lat, lng], { icon: this.newIcon });
        this.end_location.addTo(this.map).openPopup();
      }

      this.route();

    });
  }

  private createCustomMarker(waypointIndex: number, waypoint: L.Routing.Waypoint, numberOfWaypoints: number) {
    return false
  }

  route(): void {

    if (this.start_location && this.end_location) {

      if (this.ride_route) {
        this.ride_route.remove();
      }

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
        let routes = e.routes;
        let summary = routes[0].summary;
        this.totalDistance = summary.totalDistance / 1000;
        this.totalTime = Math.round(summary.totalTime % 3600 / 60);
        this.out_timeAndDistance.emit({ time: this.totalTime, distance: this.totalDistance });
      });
      this.ride_route.addTo(this.map);
    }
  }

  ngOnChanges() {
    if(this.markers.length==0){
      return;
    }
    if(this.start_location){
      this.start_location.removeFrom(this.map);
    }
    this.start_location = new L.Marker([this.markers[0].lat,this.markers[0].lon],{ icon: this.newIcon }).addTo(this.map);

    if(this.end_location){
      this.end_location.removeFrom(this.map);
    }
    this.end_location = new L.Marker([this.markers[1].lat,this.markers[1].lon],{ icon: this.newIcon }).addTo(this.map);

    this.route();
  }
    
}
