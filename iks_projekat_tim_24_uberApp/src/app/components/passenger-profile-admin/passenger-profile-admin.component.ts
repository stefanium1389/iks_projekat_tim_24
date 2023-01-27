import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BlockDialogComponent } from '../block-dialog/block-dialog.component';
import { defaultPicture } from 'src/app/user';
import { PassengerDataService } from 'src/app/backend-services/passenger-data.service';
import { AdminViewingService } from 'src/app/services/admin-viewing.service';
import { Router } from '@angular/router';
import {BlockUserService} from "../../backend-services/block-user.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import {NoteResponseDTO} from "../../backend-services/DTO/NoteResponseDTO";
import {NoteService} from "../../backend-services/note.service";

@Component({
  selector: 'app-passenger-profile-admin',
  templateUrl: './passenger-profile-admin.component.html',
  styleUrls: ['./passenger-profile-admin.component.css']
})
export class PassengerProfileAdminComponent implements OnInit {

  isAdmin: boolean = true;
  validFile: boolean = true;
  base64String: string | undefined;
  pictureReader: FileReader;
  
  userId: number;
  blocked: boolean;
  blockButtonText: string;
  
  notes: NoteResponseDTO[];
  registerForm: FormGroup;

  ProfileForm = new FormGroup({
    name: new FormControl(),
    surname: new FormControl(),
    address: new FormControl(),
    phone: new FormControl()
  });

  PasswordForm = new FormGroup({
    oldPass: new FormControl(),
    newPass: new FormControl(),
  });

  constructor(public dialog: MatDialog, private blockService: BlockUserService, private noteService: NoteService, private adminViewingService: AdminViewingService, private snackBar: MatSnackBar,
    private passengerService: PassengerDataService, private router: Router) { }

  ngOnInit(): void {
    this.base64String = defaultPicture;
    this.pictureReader = new FileReader();
    this.loadForms();
    this.setReader();
    this.notes = [];
    this.noteService.getAllNotesByUserId(this.userId).subscribe({
      next: (result) => {
        this.notes = result.results;
      },
      error: (error) => {
        console.log(error.error.message);
      }
    });
    this.registerForm = new FormGroup({
      note: new FormControl('')}
    );
  }

  loadForms() {
    let id = this.adminViewingService.getAdminViewingId();
    if (id != null)
    {
      this.userId = id;
      this.passengerService.getPassengerById(id).subscribe(
        {
          next: (result) => {
            if (result.profilePicture !== null) {
              this.base64String = result.profilePicture;
            }
            this.ProfileForm.get('name')?.setValue(result.name);
            this.ProfileForm.get('surname')?.setValue(result.surname);
            this.ProfileForm.get('address')?.setValue(result.address);
            this.ProfileForm.get('phone')?.setValue(result.telephoneNumber);
            
            this.blocked = result.blocked;
            if(this.blocked)
            {
              this.blockButtonText = "Unblock";
            }
            else
            {
              this.blockButtonText = "Block";
            }
          },
          error: (error) => {
            this.snackBar.open(error.error.message, 'Ok', {
              duration: 3000
            });
          }
        }
      );
    }
  }

  setReader ()
  {
    this.pictureReader.onloadend = () => {
      if (this.pictureReader === null) {
        throw new Error("No reader!");
      } else {
        this.base64String = this.pictureReader.result?.toString();
      }
    };
  }

  block()
  {
    if(this.blocked)
    {
      this.blockService.putUnblock(this.userId).subscribe();
      this.blocked = false;
      this.blockButtonText = "Block";
    }
    else
    {
      this.blockService.putBlock(this.userId).subscribe();
      this.blocked = true;
      this.blockButtonText = "Unblock";
    }
  }
  
  submitNote()
  {
    let message: string = this.registerForm.get('note')?.value;
    if(message != "")
    {
      this.noteService.postNoteByUserId(this.userId, message).subscribe();
      let noteResponseDTO: NoteResponseDTO = {
        id: 0,
        message: message,
        date: "28. 6. 1389."
      };
      this.notes.push(noteResponseDTO);
    }
  }

  openNoteDialog(): void {
    const dialogRef = this.dialog.open(BlockDialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  onRouting(route: string) {
    this.router.navigate([route]).then(() => {
      window.location.reload();
    });
  }


}


