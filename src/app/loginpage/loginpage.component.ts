import {Component, inject} from '@angular/core';
import {User} from "../../models/user.model";
import {Login} from "../../models/login.model";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DalUserService} from "../../services/dal-user.service";
import {DalLoginService} from "../../services/dal-login.service";
import {SessionUtilService} from "../../services/session-util.service";
import {Router} from "@angular/router";
import {NgClass} from "@angular/common";
// import icons from 'glyphicons';

@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css'
})
export class LoginpageComponent {
  user: User = new User("", "", "", "", "", "", "");
  login: Login = new Login(0, '');
  userDal = inject(DalUserService);
  loginDal = inject(DalLoginService);
  sessionUtil = inject(SessionUtilService);
  showPassword: boolean = false;

  showFailedLoginMessage: boolean = false;

  constructor(private router: Router) {
  }

  onLoginClick() {
    this.sessionUtil.logUserIn(this.user.userName, this.login.pwd)
      .then((data) => {
        let isLoggedIn = data;
        this.showFailedLoginMessage = isLoggedIn;

        if (isLoggedIn) {
          this.router.navigate(['/events']);
        }
      })
      .catch((err) => {
        this.showFailedLoginMessage = true;
      })
  }

  onCreateAccountClick() {
    this.router.navigate(['/user/add']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
