import {Component, inject} from '@angular/core';
import {DalEventService} from "../../services/dal-event.service";
import {Router} from "@angular/router";
import {EventObject} from "../../models/event.model";
import {GeoService} from "../../services/geo.service";

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
  geoService = inject(GeoService);

  constructor() {
    this.showAll()
  }

  showAll() {
    this.dal.selectAll()
      .then((data) => {
        this.events = data;
        console.log(this.events)
        return this.geoService.getCurrentLocation();
      })
      .then((data) => {
        const currentLocation = data;
        this.events.forEach((event) => {
          this.geoService.getLocationByAddress(event.location)
            .then((data) => {
              console.log('does this work?')
              return this.geoService.getRoute('fast', 'car', currentLocation, data)
            })
            .then((data) => {
              let index = this.events.indexOf(event);
              this.events[index].distance = data / 1000;
            })
            .catch((err) => {})
        })
      })
      .catch((err) => {
        console.log(err);
        this.events = [];
      })
  }

  onShowClick(event: EventObject) {
    console.log(event);
    this.router.navigate([`/event/${event.id}`]);
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
