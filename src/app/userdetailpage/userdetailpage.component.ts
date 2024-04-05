import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ValidateEqualModule} from "ng-validate-equal";
import {User} from "../../models/user.model";
import {DalUserService} from "../../services/dal-user.service";
import {SessionUtilService} from "../../services/session-util.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-userdetailpage',
  standalone: true,
  imports: [
    FormsModule,
    ValidateEqualModule
  ],
  templateUrl: './userdetailpage.component.html',
  styleUrl: './userdetailpage.component.css'
})
export class UserdetailpageComponent {

  userId: number;
  user: User = new User("", "","", "", "", "", 1);
  userDal = inject(DalUserService);
  sessionUtil = inject(SessionUtilService);
  activatedRoute = inject(ActivatedRoute);

  MIN_LENGTH: number = 5;

  constructor(private router: Router) {
    this.userId = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.userDal.selectById(this.userId)
      .then((data) => {
        this.user = data;
        console.log(this.user);
      })
      .catch((err) => {
        console.log(err);
        this.router.navigate(['/error']);
      })
  }

  onUpdateAccountClick() {
    this.userDal.update(this.user)
      .then((data) => {
        alert("update successful");
        this.router.navigate([`/user/${this.userId}/profile`])
      })
      .catch((err) => {
        alert("update unsuccessful");
        this.router.navigate([`/user/${this.userId}/profile`])
      })
  }
}
