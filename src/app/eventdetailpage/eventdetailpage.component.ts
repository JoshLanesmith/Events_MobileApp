import {Component, inject} from '@angular/core';
import {EventObject} from "../../models/event.model";
import {DalEventService} from "../../services/dal-event.service";
import {ActivatedRoute} from "@angular/router";
import {formatDate, JsonPipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

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

}
