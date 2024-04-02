import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-navloggedin',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navloggedin.component.html',
  styleUrl: './navloggedin.component.css'
})
export class NavloggedinComponent {
  title: string = "Events App";

}
