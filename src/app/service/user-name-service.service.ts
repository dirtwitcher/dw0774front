import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserNameService {

  constructor() { }

  public user = new Subject();

  setUserName(userName: string) {
    this.user.next(userName);
  }
}
