import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {formatDate, JsonPipe} from "@angular/common";
import {EventObject} from "../../models/event.model";
import {DalEventService} from "../../services/dal-event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user.model";
import {SessionUtilService} from "../../services/session-util.service";
import {DalUserService} from "../../services/dal-user.service";

@Component({
  selector: 'app-eventshowpage',
  standalone: true,
    imports: [
        FormsModule,
        JsonPipe,
        ReactiveFormsModule
    ],
  templateUrl: './eventshowpage.component.html',
  styleUrl: './eventshowpage.component.css'
})
export class EventshowpageComponent {
  eventId: number;
  currentDate: Date = new Date();
  dateString: string = formatDate(this.currentDate, "yyyy-MM-dd", 'en-US').toString();
  event: EventObject = new EventObject("", this.dateString, "", "", 0, 0, 0);
  dal = inject(DalEventService);
  activatedRoute = inject(ActivatedRoute);
  sessionUtil = inject(SessionUtilService);
  private router: any;

  constructor() {
    this.eventId = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.dal.select(this.eventId)
      .then((data)=>{
        this.event = data;
      })
      .catch((err)=>{
        console.log(err);
        this.router.navigate(['/error']);
      })
  }

  onUpdateClick() {
    this.dal.update(this.event)
      .then((data) => {
        console.log(data);
        alert("Record updated successfully");
      })
      .catch((err) => {
        console.log(err);
      })
  }
}
