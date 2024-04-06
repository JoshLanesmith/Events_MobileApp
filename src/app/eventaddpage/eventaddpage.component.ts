import {Component, inject} from '@angular/core';
import {DalEventService} from "../../services/dal-event.service";
import {FormsModule} from "@angular/forms";
import {formatDate, JsonPipe} from "@angular/common";
import {EventObject} from "../../models/event.model";

@Component({
  selector: 'app-eventaddpage',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe
  ],
  templateUrl: './eventaddpage.component.html',
  styleUrl: './eventaddpage.component.css'
})
export class EventaddpageComponent {
  currentDate: Date = new Date();
  dateString: string = formatDate(this.currentDate, "yyyy-MM-dd", 'en-US').toString();
  event: EventObject = new EventObject("", this.dateString, "", "", 0, 0, 0);

  dal = inject(DalEventService)

  constructor() {
  }

  onAddClick() {
    this.dal.insert(this.event).then((data) => {
      console.log(data);
      alert("Record added successfully");
    }).catch(e => {
      console.log("error " + e.message)
    })
  }
}
