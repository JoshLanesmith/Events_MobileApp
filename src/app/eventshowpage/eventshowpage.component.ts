import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {formatDate, JsonPipe} from "@angular/common";
import {EventObject} from "../../models/event.model";
import {DalEventService} from "../../services/dal-event.service";
import {ActivatedRoute} from "@angular/router";

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
  currentDate: Date = new Date();
  dateString: string = formatDate(this.currentDate, "yyyy-MM-dd", 'en-US').toString();
  event: EventObject = new EventObject("", this.dateString, "", "", 0, 0, 0);
  dal = inject(DalEventService)
  activatedRoute = inject(ActivatedRoute)

  constructor() {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.dal.select(id)
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
