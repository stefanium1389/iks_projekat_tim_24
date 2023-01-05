import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RideHistoryPassengerComponent } from './ride-history-passenger/ride-history-passenger.component';
import { RideListComponent } from './ride-list/ride-list.component';
import { RideListItemComponent } from './ride-list-item/ride-list-item.component';
import { MapModule } from '../components/map/map/map.module';
import { RideHistoryDetailsComponent } from './ride-history-details/ride-history-details.component';


@NgModule({
  declarations: [
    RideHistoryPassengerComponent,
    RideListComponent,
    RideListItemComponent,
    RideHistoryDetailsComponent
  ],
  imports: [
    CommonModule, MapModule
  ],
  exports: [
    RideHistoryPassengerComponent,
    RideListComponent,
    RideHistoryDetailsComponent
  ]
})
export class RideHistoryPassengerModule { }