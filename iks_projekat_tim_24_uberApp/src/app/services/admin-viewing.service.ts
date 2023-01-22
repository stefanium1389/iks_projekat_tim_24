import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminViewingService {

  roleThatAdminWatches: string | null;
  idThatAdminWatches: number | null;

  constructor() { }

  setAdminViewing(role: string, id: number)
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

  
}
