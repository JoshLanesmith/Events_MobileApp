import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, NavigationEnd} from '@angular/router';
import {SessionUtilService} from "../services/session-util.service";
import {NavloggedinComponent} from "./navloggedin/navloggedin.component";
import {NavpublicComponent} from "./navpublic/navpublic.component";
import {DatabaseService} from "../services/database.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavloggedinComponent, NavpublicComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Events App';
  database = inject(DatabaseService);
  sessionUtil = inject(SessionUtilService);

  // USED FOR DEPLOYMENT WITH USER LOGIN
  isLoggedIn: boolean | undefined = this.sessionUtil.getLoginSessionValue();
  //
  // USED TO BYPASS LOGIN
  //isLoggedIn: boolean | undefined = this.utility.getLoginSessionValue();

  constructor(private router: Router) {
    this.database.initDatabase();

    // Subscribe to router events
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check if user is logged in
        this.isLoggedIn = this.sessionUtil.getLoginSessionValue(); // Adjust this according to your session service
      }
    });

  }


}
