import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-time-dialog',
  templateUrl: './time-dialog.component.html',
  styleUrls: ['./time-dialog.component.css']
})
export class TimeDialogComponent implements OnInit {
  selectedTime: string;
  isFiveHoursInTheFuture: boolean;

  constructor(
    public dialogRef: MatDialogRef<TimeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  saveTime() {
    const selectedTimeArray = this.selectedTime.split(':');
    let selectedHour = parseInt(selectedTimeArray[0]);
    let selectedMinutes = parseInt(selectedTimeArray[1]);
    const current = new Date();
    if(selectedHour < current.getHours()){
       selectedHour += 24;
    }
    const selectedDate = new Date();
    selectedDate.setHours(selectedHour);
    selectedDate.setMinutes(selectedMinutes);

    const future = new Date().getTime() + (5 * 60 * 60 * 1000);
    this.isFiveHoursInTheFuture = selectedDate.getTime() > future;

    if (!this.isFiveHoursInTheFuture) {
      this.dialogRef.close(this.selectedTime);
    }
  }
  checkSelectedTime() {
    const selectedTimeArray = this.selectedTime.split(':');
    let selectedHour = parseInt(selectedTimeArray[0]);
    let selectedMinutes = parseInt(selectedTimeArray[1]);
    const current = new Date();
    if(selectedHour < current.getHours()){
       selectedHour += 24;
    }
    const selectedDate = new Date();
    selectedDate.setHours(selectedHour);
    selectedDate.setMinutes(selectedMinutes);

    const future = new Date().getTime() + (5 * 60 * 60 * 1000);
    this.isFiveHoursInTheFuture = selectedDate.getTime() > future;
  }
}
