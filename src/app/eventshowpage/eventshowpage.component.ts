import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {formatDate, JsonPipe} from "@angular/common";
import {EventObject} from "../../models/event.model";
import {DalEventService} from "../../services/dal-event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user.model";
import {SessionUtilService} from "../../services/session-util.service";
import {DalUserService} from "../../services/dal-user.service";
import {GeoService} from "../../services/geo.service";

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
  router = inject(Router);
  geoService = inject(GeoService);

  constructor() {
    this.eventId = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.dal.select(this.eventId)
      .then((data)=>{
        this.event = data;
        return this.geoService.getLocationByAddress(this.event.location);
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err)=>{
        console.log(err);
        this.router.navigate(['/error']);
      })
  }
  onModifyClick(event: EventObject) {
    this.router.navigate([`/event/detail/${event.id}`]);
  }
}
