import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminViewingService {

  private roleThatAdminWatches: string | null;
  private idThatAdminWatches: number | null;
  private mailThatAdminWatches: string | null;

  constructor() {
    this.roleThatAdminWatches = localStorage.getItem('roleThatAdminWatches');
    const idFromLocalStorage = localStorage.getItem('idThatAdminWatches');
    this.idThatAdminWatches = idFromLocalStorage ? parseInt(idFromLocalStorage) : null;    
    this.mailThatAdminWatches = localStorage.getItem('mailThatAdminWatches');

   }

  setAdminViewing(role: string, id: number, mail:string)
  {
    this.roleThatAdminWatches = role;
    this.idThatAdminWatches = id;
    this.mailThatAdminWatches = mail;
    localStorage.setItem('roleThatAdminWatches', role);
    localStorage.setItem('idThatAdminWatches', id.toString());
    localStorage.setItem('mailThatAdminWatches', mail);

  }

  logout()
  {
    localStorage.removeItem('roleThatAdminWatches');
    localStorage.removeItem('idThatAdminWatches'); 
    localStorage.removeItem('mailThatAdminWatches');
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
