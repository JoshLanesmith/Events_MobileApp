import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ValidateEqualModule} from "ng-validate-equal";
import {User} from "../../models/user.model";
import {DalUserService} from "../../services/dal-user.service";
import {SessionUtilService} from "../../services/session-util.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CameraService} from "../../services/camera.service";

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
  user: User = new User("", "","", "", "", "", "");
  userDal = inject(DalUserService);
  sessionUtil = inject(SessionUtilService);
  activatedRoute = inject(ActivatedRoute);
  cameraService = inject(CameraService);

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

  onUpdateUserClick() {
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

  onDeleteUserClick() {
    let result = confirm("Are you sure you want to delete your account?")

    if (result) {
      console.log(this.user);
      this.userDal.delete(this.user)
        .then((data) => {
          this.sessionUtil.logUserOut();
          this.router.navigate([`/home`]);
        })
        .catch((err) => {
          console.log('user did not delete successfully');
          console.log(err);

        })
    }

  }

  onCandelUpdateUserClick() {
    this.router.navigate([`/user/${this.userId}/profile`])
  }

  onLoadFromLibraryClick() {
    this.cameraService.loadPhotoFromLibrary()
      .then((data) => {
        this.user.profileImg = data;
      })
      .catch((err) => {
        alert(err.toString());
      })
  }

  onCapturePhotoClick() {
    this.cameraService.capturePhoto()
      .then((data) => {
        this.user.profileImg = data;
      })
      .catch((err) => {
        alert(err.toString());
      })
  }
}
