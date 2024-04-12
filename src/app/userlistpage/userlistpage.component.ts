import {Component, inject} from '@angular/core';
import {User} from "../../models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {DalUserService} from "../../services/dal-user.service";
import {EventObject} from "../../models/event.model";
import {formatDate} from "@angular/common";
import {DalEventService} from "../../services/dal-event.service";

@Component({
  selector: 'app-userlistpage',
  standalone: true,
  imports: [],
  templateUrl: './userlistpage.component.html',
  styleUrl: './userlistpage.component.css'
})
export class UserlistpageComponent {
  eventId: number;
  currentDate: Date = new Date();
  dateString: string = formatDate(this.currentDate, "yyyy-MM-dd", 'en-US').toString();
  event: EventObject = new EventObject("", this.dateString, "", "", 0, 0, 0);
  users: User[] = [];

  userDal = inject(DalUserService);
  eventDal = inject(DalEventService);
  activatedRoute = inject(ActivatedRoute);

  constructor(private router: Router) {
    this.eventId = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.eventDal.select(this.eventId)
      .then((data) => {
        this.event = data;
        let userIds: number[] = this.event.registeredUserIds
        if (userIds.includes(this.event.adminId)) {
          userIds.push(this.event.adminId);
        }

        return this.userDal.selectAll(userIds);
      })
      .then((data) => {
        this.users = data;
        console.log(this.users)
      })
      .catch((err) => {

      })

  }

  onBackClick() {
    this.router.navigate([`/event/${this.event.id}`]);
  }
}
