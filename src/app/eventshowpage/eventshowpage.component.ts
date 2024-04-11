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
import {CommentaddComponent} from "../commentadd/commentadd.component";

declare const H: any;

@Component({
  selector: 'app-eventshowpage',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    ReactiveFormsModule,
    CommentaddComponent
  ],
  templateUrl: './eventshowpage.component.html',
  styleUrl: './eventshowpage.component.css'
})
export class EventshowpageComponent {
  eventId: number;
  currentDate: Date = new Date();
  dateString: string = formatDate(this.currentDate, "yyyy-MM-dd", 'en-US').toString();
  event: EventObject = new EventObject("", this.dateString, "", "", 0, 0, 0);
  distance: number = 0;
  destination: any;
  currentLocation: any;
  showAddCommentForm: boolean = false;

  dal = inject(DalEventService);
  activatedRoute = inject(ActivatedRoute);
  sessionUtil = inject(SessionUtilService);
  router = inject(Router);
  geoService = inject(GeoService);

  constructor() {
    this.eventId = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.dal.select(this.eventId)
      .then((data) => {
        this.event = data;
        return this.geoService.getLocationByAddress(this.event.location);
      })
      .then((data) => {
        this.destination = data[0].position;
        this.showMap('mapContainer', this.destination);
        return this.geoService.getCurrentLocation();
      })
      .then((data) => {
        this.currentLocation = data;
        return this.geoService.getRoute('fast', 'car', this.currentLocation, this.destination);
      })
      .then((data) => {
        this.distance = data[0].sections[0].summary.length / 1000;
      })
      .catch((err) => {
        console.log(err);
        this.router.navigate(['/error']);
      })
  }

  onModifyClick(event: EventObject) {
    this.router.navigate([`/event/detail/${event.id}`]);
  }

  public showMap(elementId: string, location: any) {
    console.log("showing map: ")
    document.getElementById(elementId)!.innerHTML = '';

    // Initialize the platform object:
    var platform = this.geoService.hMapPlatform;

    // Obtain the default map types from the platform object
    var maptypes = platform.createDefaultLayers();

    var options = {
      zoom: 15,
      center: {
        lat: location.lat, lng: location.lng
      }
    };

    // Instantiate (and display) a map object:
    var map = new H.Map(
      document.getElementById('mapContainer'),
      maptypes.vector.normal.map,
      options
    );

    var icon = new H.map.Icon('assets/img/map-pin.png');
    var marker = new H.map.Marker({
      lat: location.lat, lng: location.lng
    }, {icon: icon});

    // Add the marker to the map and center the map at the location of the marker:
    map.addObject(marker);
  }

  onShowAddCommentClick() {
    this.showAddCommentForm = true;
  }

  processResult(param: boolean) {
    this.showAddCommentForm = param;
  }
}
