import {inject, Injectable} from '@angular/core';
import {DalUserService} from "./dal-user.service";
import {DalLoginService} from "./dal-login.service";
import {User} from "../models/user.model";
import {Login} from "../models/login.model";

@Injectable({
  providedIn: 'root'
})
export class SessionUtilService {
  userDal = inject(DalUserService);
  loginDal = inject(DalLoginService);
  user: User = new User("", "", "", "", "", "", 1);
  login: Login = new Login(0, '');

  getLoginSessionValue(): boolean {
    return sessionStorage.getItem('loggedIn') === 'true' ? true : false;
  }

  logUserIn(userName: string, pwd: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let userLoggedIn: boolean = false;

      this.userDal.select(userName)
        .then((data) => {
          this.user = data;

          return this.loginDal.select(this.user.id);
        })
        .then((data) => {
          this.login = data;


          if (this.login.pwd === pwd && pwd.length >= 5) {
            userLoggedIn = true;
            sessionStorage.setItem('userName', userName);

          } else {
            userLoggedIn = false;
          }

          sessionStorage.setItem('loggedIn', `${userLoggedIn}`);
          resolve(userLoggedIn)

        })
        .catch((err) => {
          console.log(err);
          userLoggedIn = false;
          reject(userLoggedIn);
        })

    })

  }

  logUserOut() {
    sessionStorage.setItem('loggedIn', `false`);
    sessionStorage.removeItem('userName');
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
