import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Comment, UserReference} from "../../models/comment.model";
import {formatDate} from "@angular/common";
import {DalCommentService} from "../../services/dal-comment.service";
import {EventObject} from "../../models/event.model";
import {DalEventService} from "../../services/dal-event.service";

@Component({
  selector: 'app-commentadd',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './commentadd.component.html',
  styleUrl: './commentadd.component.css'
})
export class CommentaddComponent {
  @Input() currentEvent: EventObject = new EventObject("", "", "", "", 0, 0, 0);
  @Output() onCloseAddForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onAddNewCommentToList: EventEmitter<Comment> = new EventEmitter<Comment>();

  currentDate: Date = new Date();
  dateString: string = formatDate(this.currentDate, "yyyy-MM-dd", 'en-US').toString();
  currentUser: UserReference = new UserReference(
    Number(sessionStorage.getItem('userId')),
    String(sessionStorage.getItem('userName'))
  )
  comment: Comment;

  dalComment = inject(DalCommentService);
  dalEvent = inject(DalEventService);

  constructor() {
    this.comment = new Comment(this.currentUser, 0, this.dateString, '')
  }

  onCreateCommentClick() {
    console.log(this.currentEvent);
    this.comment.eventId = Number(this.currentEvent.id);
    this.dalComment.insert(this.comment, this.currentEvent)
      .then((data) => {
        this.comment.id = data;
        console.log(`Comment Id: ${this.comment.id}`)
        this.onCloseAddForm.emit(false);
        this.onAddNewCommentToList.emit(this.comment);
      })
      .catch((err) => {
        alert("Could not add comment due to system error")
        this.onCloseAddForm.emit(false);
      })

  }

  onCancelCommentClick() {
    this.onCloseAddForm.emit(false);
  }
}
