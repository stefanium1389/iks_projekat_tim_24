import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {matchPasswords} from "../register/register.component";
import {subscribeOn} from "rxjs";
import {PanicDialogService} from "../../backend-services/panic-dialog.service";

@Component({
  selector: 'app-panic-dialog',
  templateUrl: './panic-dialog.component.html',
  styleUrls: ['./panic-dialog.component.css']
})
export class PanicDialogComponent implements OnInit
{
  registerForm: FormGroup;

  constructor(private panicDialogCall: PanicDialogService, public dialogRef: MatDialogRef<PanicDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void
  {
    this.registerForm = new FormGroup({
      reason: new FormControl('')}
    );
  }

  onSubmit()
  {
    this.panicDialogCall.putPanic(this.data.rideId, this.registerForm.get('reason')?.value).subscribe();
    this.dialogRef.close();
  }

}
