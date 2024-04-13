import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-navpublic',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navpublic.component.html',
  styleUrl: './navpublic.component.css'
})
export class NavpublicComponent {
  title: string = "Event Horizon";

}
