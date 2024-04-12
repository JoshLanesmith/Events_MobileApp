import { Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {EventaddpageComponent} from "./eventaddpage/eventaddpage.component";
import {EventdetailpageComponent} from "./eventdetailpage/eventdetailpage.component";
import {EventshowpageComponent} from "./eventshowpage/eventshowpage.component";
import {EventslistpageComponent} from "./eventslistpage/eventslistpage.component";
import {ErrorpageComponent} from "./errorpage/errorpage.component";
import {LoginpageComponent} from "./loginpage/loginpage.component";
import {UseraddpageComponent} from "./useraddpage/useraddpage.component";
import {UsershowpageComponent} from "./usershowpage/usershowpage.component";
import {UserdetailpageComponent} from "./userdetailpage/userdetailpage.component";
import {SettingspageComponent} from "./settingspage/settingspage.component";
import {UserlistpageComponent} from "./userlistpage/userlistpage.component";

export const routes: Routes = [
  {path:"home", component:HomepageComponent},
  {path:"event/add", component:EventaddpageComponent},
  {path:"event/:id", component:EventshowpageComponent},
  {path:"event/detail/:id", component:EventdetailpageComponent},
  {path:"event/:id/guests", component:UserlistpageComponent},
  {path:"events", component:EventslistpageComponent},
  {path:"login", component:LoginpageComponent},
  {path:"user/add", component:UseraddpageComponent},
  {path:"user/:id/profile", component:UsershowpageComponent},
  {path:"user/:id/detail", component:UserdetailpageComponent},
  {path:"settings", component:SettingspageComponent},
  {path:"", redirectTo:"/home", pathMatch:"full"},
  {path:"**", component:ErrorpageComponent},
];
