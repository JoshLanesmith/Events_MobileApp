import {Component, inject} from '@angular/core';
import {DalEventService} from "../../services/dal-event.service";
import {Router} from "@angular/router";
import {EventObject} from "../../models/event.model";

@Component({
  selector: 'app-eventslistpage',
  standalone: true,
  imports: [],
  templateUrl: './eventslistpage.component.html',
  styleUrl: './eventslistpage.component.css'
})
export class EventslistpageComponent {
  events: EventObject[] = [];

  dal = inject(DalEventService)
  router = inject(Router)

  constructor() {
    this.showAll()
  }

  showAll() {
    this.dal.selectAll().then((data) => {
      this.events = data;
      console.log(this.events)
    }).catch((err) => {
      console.log(err);
      this.events = [];
    })
  }

  onDetailsClick(event: EventObject) {
    console.log(event);
    this.router.navigate([`/event/${event.id}`]);
  }

  onModifyClick(event: EventObject) {
    this.router.navigate([`/detail/${event.id}`]);
  }

  onDeleteClick(event: EventObject) {
    this.dal.delete(event)
      .then((data) => {
        console.log(data);
        this.showAll();
        alert("Event deleted successfully");
      })
      .catch((err) => {
        console.log(err);
      })
  }

  protected readonly onselect = onselect;
}
