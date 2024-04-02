import {Component, inject} from '@angular/core';
import {DalEventService} from "../../services/dal-event.service";
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
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
  event: EventObject = new EventObject("", "02/04/2024", "", "", 0, 0, 0);

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
