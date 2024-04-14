import {Component, inject} from '@angular/core';
import {EventObject} from "../../models/event.model";
import {DalEventService} from "../../services/dal-event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {formatDate, JsonPipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SessionUtilService} from "../../services/session-util.service";
import {GeoService} from "../../services/geo.service";

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
  locationError: string | undefined;

  eventDal = inject(DalEventService);
  activatedRoute = inject(ActivatedRoute);
  sessionUtil = inject(SessionUtilService);
  router = inject(Router);
  geoService = inject(GeoService);

  MIN_CAPACITY: number = 5;

  constructor() {
    this.eventId = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.eventDal.select(this.eventId)
      .then((data)=>{
        this.event = data;
      })
      .catch((err)=>{
        console.log(err)
      })
  }
  onUpdateClick() {
    this.geoService.getLocationByAddress(this.event.location)
      .then((data) => {
        return this.eventDal.update(this.event);
      })
      .then((data) => {
        alert("Record updated successfully");
        this.eventId = Number(this.activatedRoute.snapshot.paramMap.get("id"));
        this.router.navigate([`/event/${this.eventId}`]);
      })
      .catch((err) => {
        if (err.source === 'getLocationByAddress'){
          this.locationError = err.message;
        }
      })
  }

  onCandelUpdateEventClick() {
    this.router.navigate([`/event/${this.eventId}`])
  }

  onDeleteEventClick() {
    let result = confirm("Are you sure you want to delete your event?")

    if (result) {
      console.log(this.event);
      this.eventDal.delete(this.event)
        .then((data) => {
          this.router.navigate([`/events`]);
        })
        .catch((err) => {
          console.log('event did not delete successfully');
          console.log(err);
        })
    }
  }
}
