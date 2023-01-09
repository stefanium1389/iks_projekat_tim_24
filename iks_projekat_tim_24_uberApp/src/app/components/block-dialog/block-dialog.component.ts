import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-block-dialog',
  templateUrl: './block-dialog.component.html',
  styleUrls: ['./block-dialog.component.css']
})

export class BlockDialogComponent implements OnInit {

  banNote: string;

  constructor(
    public dialogRef: MatDialogRef<BlockDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.banNote);
    this.dialogRef.close(this.banNote);
  }

}