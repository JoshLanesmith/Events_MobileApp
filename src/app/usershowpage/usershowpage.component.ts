import {Component, inject} from '@angular/core';
import {User} from "../../models/user.model";
import {SessionUtilService} from "../../services/session-util.service";
import {DalUserService} from "../../services/dal-user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-usershowpage',
  standalone: true,
  imports: [],
  templateUrl: './usershowpage.component.html',
  styleUrl: './usershowpage.component.css'
})
export class UsershowpageComponent {
  user: User = new User("", "", "", "", "", "", 1);
  sessionUtil = inject(SessionUtilService);
  userDal = inject(DalUserService);

  constructor(private router: Router) {
    let userId: number = this.sessionUtil.getLoggedInUserID();
    this.userDal.selectById(userId)
      .then((data) => {
        this.user = data;
      })
      .catch((err) => {
        console.log(err);
        this.router.navigate(['/error']);
      })
  }

  onEditProfileClick() {
    this.router.navigate([`/user/${this.user.id}/detail`]);
  }
}
