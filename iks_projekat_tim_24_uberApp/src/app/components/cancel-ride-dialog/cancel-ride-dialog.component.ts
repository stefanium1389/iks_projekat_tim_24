import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RideDataService} from "../../backend-services/ride-data.service";
import {ReasonDTO} from "../../backend-services/DTO/ReasonDTO";

@Component({
  selector: 'app-cancel-ride-dialog',
  templateUrl: './cancel-ride-dialog.component.html',
  styleUrls: ['./cancel-ride-dialog.component.css']
})
export class CancelRideDialogComponent implements OnInit
{
  registerForm: FormGroup;

  constructor(private rideDataCall: RideDataService, public dialogRef: MatDialogRef<CancelRideDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void
  {
    this.registerForm = new FormGroup({
      reason: new FormControl('')}
    );
  }

  onSubmit()
  {
    let reasonDTO:ReasonDTO = {reason: this.registerForm.get('reason')?.value};
    this.rideDataCall.putCancelRide(this.data.rideId, reasonDTO).subscribe();
    this.dialogRef.close();
  }

}
