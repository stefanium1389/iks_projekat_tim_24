import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-unregistered-user-main',
  templateUrl: './unregistered-user-main.component.html',
  styleUrls: ['./unregistered-user-main.component.css']
})
export class UnregisteredUserMainComponent implements OnInit {

  destinationForm: FormGroup;

  constructor() {
    this.destinationForm = new FormGroup({
      start_location: new FormControl(),
      end_location: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  search(which : string) {
    if (which === "start")
    {
      console.log(`pocetna sacuvana u komponenti je ${this.destinationForm.get('start_location')?.value}`)
    }
    else
    {
      console.log(`krajnja sacuvana u komponenti je ${this.destinationForm.get('end_location')?.value}`)
    }
    
    /*const usernameControl = this.loginForm.get('start_location');
    usernameControl?.setValue("angulu");*/
  }

}
