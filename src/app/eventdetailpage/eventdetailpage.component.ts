import {Component, inject} from '@angular/core';
import {EventObject} from "../../models/event.model";
import {DalEventService} from "../../services/dal-event.service";
import {ActivatedRoute} from "@angular/router";
import {formatDate, JsonPipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SessionUtilService} from "../../services/session-util.service";

@Component({
  selector: 'app-eventdetailpage',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './eventdetailpage.component.html',
  styleUrl: './eventdetailpage.component.css'
})
export class EventdetailpageComponent {
  eventId: number;
  currentDate: Date = new Date();
  dateString: string = formatDate(this.currentDate, "yyyy-MM-dd", 'en-US').toString();
  event: EventObject = new EventObject("", this.dateString, "", "", 0, 0, 0);
  dal = inject(DalEventService);
  activatedRoute = inject(ActivatedRoute);
  sessionUtil = inject(SessionUtilService);

  constructor() {
    this.eventId = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.dal.select(this.eventId)
      .then((data)=>{
        this.event = data;
      })
      .catch((err)=>{
        console.log(err)
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
