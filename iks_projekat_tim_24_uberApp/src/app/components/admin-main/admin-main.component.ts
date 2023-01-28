import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { TimeDialogComponent } from '../time-dialog/time-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {

  inRide = false;
  time:number;
  cost:number;
  hasBaby:boolean;
  hasPet:boolean;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
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
  

}
