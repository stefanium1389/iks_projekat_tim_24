import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { MapService } from '../map.service';
import { EventEmitter, Output } from '@angular/core';
import { start } from '@popperjs/core';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map: any;
  start_location : L.Marker
  end_location : L.Marker
  ride_route : L.Routing.Control

  constructor(private mapService: MapService, ) {
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

    //this.search();
    // this.addMarker();
    // this.registerOnClick();
    // this.route();
  }

  search2(address : string, which : string): void {

    this.mapService.search(address).subscribe({
      next: (result) => {
        //console.log(result);
        console.log(this.start_location);
        if (which === "start")
        {
          if (this.start_location)
          {
            this.start_location.removeFrom(this.map);
          }
          this.start_location = L.marker([result[0].lat, result[0].lon]);
          this.start_location.addTo(this.map).openPopup();
        }
        else
        {
          if (this.end_location)
          {
            this.end_location.removeFrom(this.map);
          }
          this.end_location = L.marker([result[0].lat, result[0].lon]);
          this.end_location.addTo(this.map).openPopup();
        }
        this.route2();
          
      },
      error: () => {},
    });

    this.map

  }

  search(): void {
    this.mapService.search('Strazilovska 19').subscribe({
      next: (result) => {
        console.log(result);
        L.marker([result[0].lat, result[0].lon])
          .addTo(this.map)
          .bindPopup('Pozdrav iz Strazilovske 19.')
          .openPopup();
      },
      error: () => {},
    });
  }

  registerOnClick(): void {
    this.map.on('click', (e: any) => {
      const coord = e.latlng;
      const lat = coord.lat;
      const lng = coord.lng;
      this.mapService.reverseSearch(lat, lng).subscribe((res) => {
        console.log(res.display_name);
      });
      console.log(
        'You clicked the map at latitude: ' + lat + ' and longitude: ' + lng
      );
      const mp = new L.Marker([lat, lng]).addTo(this.map);
      alert(mp.getLatLng());
    });
  }

  route(): void {
    L.Routing.control({
      waypoints: [L.latLng(57.74, 11.94), L.latLng(57.6792, 11.949)],
    }).addTo(this.map);
  }

  route2(): void {

    if (this.start_location && this.end_location)
    {

      if (this.ride_route)
      {
        this.ride_route.remove();
      }

      this.ride_route = L.Routing.control({
        waypoints: [this.start_location.getLatLng(), this.end_location.getLatLng()],
      })
      this.ride_route.addTo(this.map);
    }
  }

  private addMarker(): void {
    const lat: number = 45.25;
    const lon: number = 19.8228;

    L.marker([lat, lon])
      .addTo(this.map)
      .bindPopup('Trenutno se nalazite ovde.')
      .openPopup();
  }

  ngAfterViewInit(): void {
    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    this.initMap();
  }
}
