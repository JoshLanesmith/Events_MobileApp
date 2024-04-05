import {Component, inject} from '@angular/core';
import {User} from "../../models/user.model";
import {SessionUtilService} from "../../services/session-util.service";
import {DalUserService} from "../../services/dal-user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-usershowpage',
  standalone: true,
  imports: [],
  templateUrl: './usershowpage.component.html',
  styleUrl: './usershowpage.component.css'
})
export class UsershowpageComponent {
  userId: number;
  user: User = new User("", "", "", "", "", "", 1);
  sessionUtil = inject(SessionUtilService);
  userDal = inject(DalUserService);
  activatedRoute = inject(ActivatedRoute);

  constructor(private router: Router) {
    this.userId = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.userDal.selectById(this.userId)
      .then((data) => {
        this.user = data;
      })
      .catch((err) => {
        console.log(err);
        this.router.navigate(['/error']);
      })
  }

  onEditProfileClick() {
    this.router.navigate([`/user/${this.userId}/detail`]);
  }
}
