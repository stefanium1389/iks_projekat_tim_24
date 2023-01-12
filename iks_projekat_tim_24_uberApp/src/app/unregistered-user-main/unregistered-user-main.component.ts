import { Component, OnInit,ViewChild,Output,EventEmitter, Input} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MapComponent } from '../components/map/map/map.component';
import { TimeAndDistance } from '../components/map/map/map.component';

@Component({
  selector: 'app-unregistered-user-main',
  templateUrl: './unregistered-user-main.component.html',
  styleUrls: ['./unregistered-user-main.component.css']
})
export class UnregisteredUserMainComponent implements OnInit {

  destinationForm: FormGroup;
  @ViewChild(MapComponent) map !:any ;
  @Input() timeAndDistance: {time: number, distance: number};
  dobijena : string;
  time : number;
  distance : string;
  locationType : string = "departure";


  constructor() {
    this.destinationForm = new FormGroup({
      start_location: new FormControl(),
      end_location: new FormControl(),
    });
    
  }

  ngOnInit(): void {}

  onTypeChange(type : string)
  {
    this.map.locationType = type;
  }

  locStartHandler(loc:string)
  {
      this.destinationForm.get('start_location')?.setValue(loc);
  }

  locEndHandler(loc:string)
  {
      this.destinationForm.get('end_location')?.setValue(loc);
  }

  timeAndDistanceHandler(timeAndDistance : TimeAndDistance)
  {
      this.time = timeAndDistance.time;
      this.distance = Number(timeAndDistance.distance).toFixed(2);
  }

  search(which : string) {
    console.log("iz unregistered "+this.time+" "+this.distance)
    if (which === "start")
    {
      this.map.search(this.destinationForm.get('start_location')?.value,"start");
    }
    else
    {
      this.map.search(this.destinationForm.get('end_location')?.value,"end");
    }
    
  }

}
