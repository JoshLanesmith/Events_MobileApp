import {Component, inject} from '@angular/core';
import {DalEventService} from "../../services/dal-event.service";
import {FormsModule} from "@angular/forms";
import {formatDate, JsonPipe} from "@angular/common";
import {EventObject} from "../../models/event.model";
import {Router} from "@angular/router";
import {GeoService} from "../../services/geo.service";

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
  currentUserId: number = Number(sessionStorage.getItem('userId'))
  currentDate: Date = new Date();
  dateString: string = formatDate(this.currentDate, "yyyy-MM-dd", 'en-US').toString();
  event: EventObject = new EventObject("", this.dateString, "", "", 0, 0, this.currentUserId);
  locationError: string | undefined;

  eventDal = inject(DalEventService);
  geoService = inject(GeoService);
  router = inject(Router);

  MIN_CAPACITY: number = 5;

  constructor() {
  }

  onAddClick() {

    this.geoService.getLocationByAddress(this.event.location)
      .then((data) => {
        return this.eventDal.insert(this.event);
      })
      .then((data) => {
        alert("Record added successfully");
        this.router.navigate([`/events`]);
      })
      .catch((err) => {
        console.log(err)
        if (err.source === 'getLocationByAddress'){
          this.locationError = err.message;
        }
      })
  }
}
