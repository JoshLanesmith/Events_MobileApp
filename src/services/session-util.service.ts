import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionUtilService {

  getLoginSessionValue(): boolean {
    return sessionStorage.getItem('loggedIn') === 'true' ? true : false;
  }

  constructor() {
    this.initLoginSessionValue();
  }

  private initLoginSessionValue() {
    const loggedInSessionValue = sessionStorage.getItem('loggedIn');
    let isLoggedIn: boolean = false;

    if (loggedInSessionValue === 'true') {
      isLoggedIn = true;
    } else {
      isLoggedIn = false;
    }

    sessionStorage.setItem('loggedIn', `${isLoggedIn}`)
  }


}
