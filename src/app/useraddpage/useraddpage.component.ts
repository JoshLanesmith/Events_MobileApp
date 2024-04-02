import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-useraddpage',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './useraddpage.component.html',
  styleUrl: './useraddpage.component.css'
})
export class UseraddpageComponent {
  user: User = new User("", "","", "", "", "", 1);
  pwd: string = "";
  confirmPwd: string = "";

}
