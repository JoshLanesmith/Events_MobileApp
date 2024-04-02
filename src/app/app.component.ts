import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {SessionUtilService} from "../services/session-util.service";
import {NavloggedinComponent} from "./navloggedin/navloggedin.component";
import {NavpublicComponent} from "./navpublic/navpublic.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavloggedinComponent, NavpublicComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Events App';
  utility = inject(SessionUtilService);

  // USED FOR DEPLOYMENT WITH USER LOGIN
  isLoggedIn: boolean | undefined = this.utility.getLoginSessionValue();
  //
  // USED TO BYPASS LOGIN
  //isLoggedIn: boolean | undefined = this.utility.getLoginSessionValue();



}
