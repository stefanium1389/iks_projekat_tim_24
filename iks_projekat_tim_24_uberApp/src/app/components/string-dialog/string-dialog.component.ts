import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-string-dialog',
  templateUrl: './string-dialog.component.html',
  styleUrls: ['./string-dialog.component.css']
})
export class StringDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<StringDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
