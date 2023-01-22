import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MAT_DRAWER_DEFAULT_AUTOSIZE_FACTORY } from '@angular/material/sidenav';
import { environment } from 'src/environments/environment';
import { LinkUsersService } from 'src/app/services/link-users.service';
import { UserDTO } from 'src/app/backend-services/DTO/UserDTO';
import { DTOList } from 'src/app/backend-services/DTO/DTOList';


@Component({
  selector: 'app-search-user-dialog',
  templateUrl: './search-user-dialog.component.html',
  styleUrls: ['./search-user-dialog.component.css']
})
export class SearchUserDialogComponent implements OnInit {

  results: UserDTO[] = [];
  searchForm: FormGroup;

  constructor(private http: HttpClient, private linkUsersService: LinkUsersService) {  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      q: new FormControl('',Validators.required),
    });
  }

  async onSubmit(): Promise<void> {
    this.results = [];
    const querry = this.searchForm.get('q')?.value;
    if(querry){
      const response = await this.http.get(environment.apiBaseUrl+`api/user/search?querry=${querry}`).toPromise() as DTOList<UserDTO>;
      for(let user of response.results){
        this.results.push(user);
      };
    }
  }
  
  addUser(user: UserDTO){
    //console.log(user);
    this.linkUsersService.addUser(user);
  }
}


