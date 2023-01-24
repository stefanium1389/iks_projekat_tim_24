import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RideDataService } from '../backend-services/ride-data.service';
import { MapComponent } from '../components/map/map/map.component';
import { TimeAndCost } from '../components/map/map/map.component';

@Component({
  selector: 'app-unregistered-user-main',
  templateUrl: './unregistered-user-main.component.html',
  styleUrls: ['./unregistered-user-main.component.css']
})
export class UnregisteredUserMainComponent implements OnInit {

  destinationForm: FormGroup;
  @ViewChild(MapComponent) map !: any;
  @Input() timeAndDistance: { time: number, distance: number };
  dobijena: string;
  time: number;
  cost: string;
  selectedType: string = 'STANDARD';
  locationType: string = "departure";

  constructor(private rideService : RideDataService) {
    this.destinationForm = new FormGroup({
      start_location: new FormControl(),
      end_location: new FormControl(),
    });

  }

  ngOnInit(): void { }

  onTypeChange(type: string) {
    this.map.locationType = type;
  }

  onVehicleTypeChange(type: string) {
    this.map.selectedVehicleType = type;
    this.map.route()
  }

  locStartHandler(loc: string) {
    this.destinationForm.get('start_location')?.setValue(loc);
  }

  locEndHandler(loc: string) {
    this.destinationForm.get('end_location')?.setValue(loc);
  }

  timeAndDistanceHandler(timeAndCost: TimeAndCost) {
    if (timeAndCost.time) {
      this.time = timeAndCost.time;
    }
    if (timeAndCost.cost) {
      this.cost = Number(timeAndCost.cost).toFixed(2);
    }

  }

  search(which: string) {
    console.log("iz unregistered " + this.time + " " + this.cost)
    if (which === "start") {
      this.map.search(this.destinationForm.get('start_location')?.value, "start");
    }
    else {
      this.map.search(this.destinationForm.get('end_location')?.value, "end");
    }

  }

}
