import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  constructor(private router: Router) {
  }
  onLoginClick() {
    this.router.navigate(['/login']);
  }
}
