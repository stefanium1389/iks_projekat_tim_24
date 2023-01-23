import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminViewingService {

  private roleThatAdminWatches: string | null;
  private idThatAdminWatches: number | null;
  private mailThatAdminWatches: string | null;

  constructor() { }

  setAdminViewing(role: string, id: number, mail:string)
  {
    this.roleThatAdminWatches = role;
    this.idThatAdminWatches = id;
  }

  getAdminViewingId()
  {
    return this.idThatAdminWatches;
  }

  getAdminViewingRole()
  {
    return this.roleThatAdminWatches;
  }

  getAdminViewingMail()
  {
    return this.mailThatAdminWatches;
  }

  
}
