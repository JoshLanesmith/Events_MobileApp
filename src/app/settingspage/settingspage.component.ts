import {Component, inject} from '@angular/core';
import {DalCommentService} from "../../services/dal-comment.service";
import {DalEventService} from "../../services/dal-event.service";
import {DalUserService} from "../../services/dal-user.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-settingspage',
  standalone: true,
  imports: [],
  templateUrl: './settingspage.component.html',
  styleUrl: './settingspage.component.css'
})
export class SettingspageComponent {
  userRole: string | null = sessionStorage.getItem('userRole');
  commentDal = inject(DalCommentService);
  eventDal = inject(DalEventService);
  userDal = inject(DalUserService);


  onDeleteCommentsClick() {
    const result = confirm("Are you sure you want to delete all comments");
    if (result) {
      this.commentDal.deleteAll()
        .then((data) => {
          alert('all comments deleted successfully')
        })
        .catch((err) => {
          alert('error in deleting all comments')
        })
    }
  }

  onDeleteEventsClick() {
    const result = confirm("Are you sure you want to delete all events");
    if (result) {
      this.commentDal.selectAllByEventId()
        .then((data) => {
          console.log(data);
          if (data.length > 0) {
            alert('There are comments in the database associated with events. Delete all comments before deleting events.')
            return false;
          } else {
            return this.eventDal.deleteAll();
          }
        })
        .then((data) => {
          alert('all events deleted successfully');
        })
        .catch((err) => {
          alert('error in deleting all events')
        })
    }
  }

  onDeleteUsersClick() {
    const result = confirm("Are you sure you want to delete all users");
    if (result) {
      this.eventDal.selectAll()
        .then((data) => {
          if (data.length > 0) {
            alert('There are events in the database associated with users. Delete all events before deleting users.')
            return false;
          } else {
            return this.userDal.deleteAll();
          }
        })
        .then((data) => {
          alert('all users deleted successfully, except for \'admin\'');
        })
        .catch((err) => {
          alert('error in deleting all users')
        })
    }

  }
}
