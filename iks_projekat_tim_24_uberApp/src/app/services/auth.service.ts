import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = false;
  private _isLoggedInSubject = new Subject<boolean>();
  isLoggedIn$ = this._isLoggedInSubject.asObservable();

  get isLoggedIn() {
    return this._isLoggedIn;
  }

  set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
    this._isLoggedInSubject.next(value);
  }
}
