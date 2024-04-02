import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {User} from "../../models/user.model";
import {DalUserService} from "../../services/dal-user.service";
import {SessionUtilService} from "../../services/session-util.service";
import {Router} from "@angular/router";
import { ValidateEqualModule } from 'ng-validate-equal';

@Component({
  selector: 'app-useraddpage',
  standalone: true,
  imports: [
    FormsModule, ValidateEqualModule
  ],
  templateUrl: './useraddpage.component.html',
  styleUrl: './useraddpage.component.css'
})
export class UseraddpageComponent {
  user: User = new User("", "","", "", "", "", 1);
  pwd: string = "";
  confirmPwd: string = "";
  userDal = inject(DalUserService);
  sessionUtil = inject(SessionUtilService);

  MIN_LENGTH: number = 5;

  constructor(private router: Router) {
  }

  onCreateAccountClick() {
    this.userDal.insert(this.user, this.pwd)
      .then((data) => {
        console.log('Account Created!!!')
        return this.sessionUtil.logUserIn(this.user.userName, this.pwd);
      })
      .then((data) => {
        let isLoggedIn = data;
        if (isLoggedIn) {
          this.router.navigate(['/events']);
        }
      })
      .catch((err) => {
        console.log('Error in creating Account')
      })
  }
}
