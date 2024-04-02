import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {SessionUtilService} from "../../services/session-util.service";

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
  sessionUtil = inject(SessionUtilService);

  constructor(private router: Router) {
  }

  onLogoutClick() {
    this.sessionUtil.logUserOut();
    this.router.navigate(['/login']);
  }
}
