import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {formatDate, JsonPipe} from "@angular/common";
import {EventObject} from "../../models/event.model";
import {DalEventService} from "../../services/dal-event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SessionUtilService} from "../../services/session-util.service";
import {GeoService} from "../../services/geo.service";
import {CommentaddComponent} from "../commentadd/commentadd.component";
import {Comment} from "../../models/comment.model";
import {DalCommentService} from "../../services/dal-comment.service";
import {CommentshowComponent} from "../commentshow/commentshow.component";


declare const H: any;

@Component({
  selector: 'app-eventshowpage',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    ReactiveFormsModule,
    CommentaddComponent,
    CommentshowComponent
  ],
  templateUrl: './eventshowpage.component.html',
  styleUrl: './eventshowpage.component.css'
})
export class EventshowpageComponent {
  eventId: number;
  currentDate: Date = new Date();
  dateString: string = formatDate(this.currentDate, "yyyy-MM-dd", 'en-US').toString();
  event: EventObject = new EventObject("", this.dateString, "", "", 0, 0, 0);
  distance: any;
  destination: any;
  currentLocation: any;
  currentUser: number = Number(sessionStorage.getItem('userId'));
  showAddCommentForm: boolean = false;
  comments: Comment[] = [];

  eventDal = inject(DalEventService);
  commentDal = inject(DalCommentService);
  activatedRoute = inject(ActivatedRoute);
  sessionUtil = inject(SessionUtilService);
  router = inject(Router);
  geoService = inject(GeoService);

  constructor() {
    this.eventId = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.eventDal.select(this.eventId)
      .then((data) => {
        this.event = data;
        return this.geoService.getLocationByAddress(this.event.location);
      })
      .then((data) => {
        this.destination = data;
        this.showMap('mapContainer', this.destination);
        return this.geoService.getCurrentLocation();
      })
      .then((data) => {
        this.currentLocation = data;
        return this.geoService.getRoute('fast', 'car', this.currentLocation, this.destination);
      })
      .then((data) => {
        if (typeof data === 'number') {
          this.distance = data / 1000;
        } else {
          this.distance = data;
        }
      })
      .catch((err) => {
        console.log(err);
        // this.router.navigate(['/error']);
      })

    this.commentDal.selectAllByEventId(this.eventId)
      .then((data) => {
        this.comments = data;
      })
      .catch((err) => {
        console.log(err)
      })
  }

  onModifyClick(event: EventObject) {
    this.router.navigate([`/event/detail/${event.id}`]);
  }

  onRegisterClick() {
    if (this.event.guestCount >= this.event.capacity) {
      alert('Sorry, this event is already full');
      return;
    }

    const currentUserId: number = Number(sessionStorage.getItem('userId'));

    if (this.event.registeredUserIds.includes(currentUserId))
      return;

    this.event.registeredUserIds.push(currentUserId)
    this.event.guestCount++;

    this.eventDal.update(this.event)
      .then((data) => {

      })
      .catch((err) => {
        alert('Error in registering for event');
        const indexToRemove = this.event.registeredUserIds.indexOf(currentUserId)
        this.event.registeredUserIds.splice(indexToRemove, 1);
        this.event.guestCount--;
      })
  }

  onUnregisterClick() {
    const currentUserId: number = Number(sessionStorage.getItem('userId'));

    if (!this.event.registeredUserIds.includes(currentUserId))
      return;

    const indexToRemove = this.event.registeredUserIds.indexOf(currentUserId)
    this.event.registeredUserIds.splice(indexToRemove, 1);
    this.event.guestCount--;

    this.eventDal.update(this.event)
      .then((data) => {

      })
      .catch((err) => {
        alert('Error in unregistering for event');
        this.event.registeredUserIds.push(currentUserId)
        this.event.guestCount++;
      })
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

  closeAddForm(param: boolean) {
    this.showAddCommentForm = param;
  }

  addNewCommentToList(param: Comment) {
    this.comments.push(param);
  }

  removeCommentFromList(param: Comment) {
    let index = this.comments.indexOf(param);
    this.comments.splice(index, 1);
  }

  onGuestsClick() {
    this.router.navigate([`/event/${this.event.id}/guests`]);
  }

  isDistanceNumber(): boolean {
    return typeof this.distance === 'number';
  }
}
