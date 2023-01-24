import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavoriteRideResponseDTO } from 'src/app/backend-services/DTO/FavoriteRideDTO';
import { RideDTO, RideRequestDTO } from 'src/app/backend-services/DTO/RideDTO';
import { RideDataService } from 'src/app/backend-services/ride-data.service';
import { JwtService } from '../jwt-service.service';
import { TimeDialogComponent } from '../time-dialog/time-dialog.component';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {
  transform(value: string, limit: number = 50, completeWords: boolean = false, ellipsis: string = '...') {
    if (completeWords) {
      limit = value.substr(0, 13).lastIndexOf(' ');
    }
    return `${value.slice(0, limit)}${ellipsis}`;
  }
}

@Component({
  selector: 'app-favourite-routes',
  templateUrl: './favourite-routes.component.html',
  styleUrls: ['./favourite-routes.component.css']
})
export class FavouriteRoutesComponent implements OnInit {


  constructor(private rides: RideDataService, private snackBar:MatSnackBar, private dialog:MatDialog) { }

  favoriteRoutes:FavoriteRideResponseDTO[];
  selectedFav:FavoriteRideResponseDTO | null;
  markers:any[];

  ngOnInit(): void {
    this.rides.getFavorites().subscribe({
      next: (result) => {
        this.favoriteRoutes = result
      }
    })
  }
  selectFavorite(fav: FavoriteRideResponseDTO) {
    console.log(fav);
    this.selectedFav = fav;
    this.markers = [{lat:fav.locations[0].departure.latitude,lon:fav.locations[0].departure.longitude},{lat:fav.locations[0].destination.latitude,lon:fav.locations[0].destination.longitude}]

  }

  openTimePicker(arg0: FavoriteRideResponseDTO) {
    console.log("lmaooo");
    const dialogRef = this.dialog.open(TimeDialogComponent, {
      width: '250px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {

      const dto: RideRequestDTO = {
        locations: arg0.locations,
        passengers: arg0.passengers,
        vehicleType: arg0.vehicleType,
        scheduledTime: result,
        babyTransport: arg0.babyTransport,
        petTransport: arg0.petTransport
      }
      this.rides.postRide(dto).subscribe({
        next: (result) => {
          console.log(result)
        },
        error: (error) => {
          this.snackBar.open(error.error.message, 'Ok', {
            duration: 3000
          });
        }
      });
    });
  }
  createRide(arg0: FavoriteRideResponseDTO) {
    if(arg0 == null){
      return;
    }
    console.log('kliknut sam :))');
    //console.log(arg0);
    const dto: RideRequestDTO = {
      locations: arg0.locations,
      passengers: arg0.passengers,
      vehicleType: arg0.vehicleType,
      scheduledTime: null,
      babyTransport: arg0.babyTransport,
      petTransport: arg0.petTransport
    }

    this.rides.postRide(dto).subscribe({
      next: (result) => {
        console.log(result)
      },
      error: (error) => {
        this.snackBar.open(error.error.message, 'Ok', {
          duration: 3000
        });
      }
    });
  }
  removeFav(fav:FavoriteRideResponseDTO){
    this.rides.deleteFavorite(fav.id).subscribe({
      next: (result) => {
        this.snackBar.open('Favorite removed!', 'Ok', {
          duration: 3000
        });
        this.rides.getFavorites().subscribe({
          next: (result) => {
            this.favoriteRoutes = result
            this.markers = []
            this.selectedFav = null;
          }
        })
      },
      error: (error) => {
        this.snackBar.open(error.error.message, 'Ok', {
          duration: 3000
        });
      }
    })
  }
}
