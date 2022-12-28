import { Component, OnInit,ViewChild,Output,EventEmitter, Input} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MapComponent } from '../components/map/map/map.component';

@Component({
  selector: 'app-unregistered-user-main',
  templateUrl: './unregistered-user-main.component.html',
  styleUrls: ['./unregistered-user-main.component.css']
})
export class UnregisteredUserMainComponent implements OnInit {

  destinationForm: FormGroup;
  @ViewChild(MapComponent) map !:any ;
  @Input() timeAndDistance: {time: number, distance: number};
  time : number;
  distance : number;


  constructor() {
    this.destinationForm = new FormGroup({
      start_location: new FormControl(),
      end_location: new FormControl()
    });

    
  }

  ngOnInit(): void {
    
  }

  ngOnChanges() {
    console.log(this.timeAndDistance);
    this.time = this.timeAndDistance.time;
    this.distance = this.timeAndDistance.distance;
  }

  search(which : string) {
    console.log("iz unregistered "+this.time+" "+this.distance)
    if (which === "start")
    {
      this.map.search2(this.destinationForm.get('start_location')?.value,"start");
    }
    else
    {
      this.map.search2(this.destinationForm.get('end_location')?.value,"end");
    }
    
  }

}
