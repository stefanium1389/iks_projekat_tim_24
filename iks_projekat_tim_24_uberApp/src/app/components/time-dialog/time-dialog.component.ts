import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-time-dialog',
  templateUrl: './time-dialog.component.html',
  styleUrls: ['./time-dialog.component.css']
})
export class TimeDialogComponent implements OnInit {

  selectedTime: string;

  constructor(
    public dialogRef: MatDialogRef<TimeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  saveTime() {
    console.log(this.selectedTime);
    this.dialogRef.close(this.selectedTime);
  }

}
