import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { TimeDialogComponent } from '../time-dialog/time-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';

@Component({
  selector: 'app-passenger-main',
  templateUrl: './passenger-main.component.html',
  styleUrls: ['./passenger-main.component.css']
})
export class PassengerMainComponent implements OnInit {

  inRide = true;
  isFavorited = false;
  isTypeSelected = false;
  selectedType = '';
  hasBaby = false;
  hasPet = false;
  selectedTime: string = "xddd";
  showTime = false;
  

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  toggleFavorite() {
    this.isFavorited = !this.isFavorited;
  }

  onTypeChange(type: string) {
    this.selectedType = type;
    this.isTypeSelected = true;
  }

  @ViewChild('checkbox_option', {static: false}) checkbox_option: ElementRef;
  onBabyClick() {
    this.hasBaby = !this.hasBaby;
    if (this.hasBaby) {
      this.checkbox_option.nativeElement.classList.add('clicked');
    } else {
      this.checkbox_option.nativeElement.classList.remove('clicked');
    }
  }

  openTimePicker() {
    console.log("lmaooo");
    const dialogRef = this.dialog.open(TimeDialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The time picker dialog was closed');
      this.selectedTime = result;
      this.showTime = true;
    });
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(ReportDialogComponent, {
      width: '250px',
      data: {}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

}
