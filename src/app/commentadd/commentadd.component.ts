import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Comment, UserReference} from "../../models/comment.model";
import {formatDate} from "@angular/common";

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
  currentDate: Date = new Date();
  dateString: string = formatDate(this.currentDate, "yyyy-MM-dd", 'en-US').toString();
  currentUser: UserReference = new UserReference(
    Number(sessionStorage.getItem('userId')),
    String(sessionStorage.getItem('userName'))
  )
  comment: Comment;

  constructor() {
    this.comment = new Comment(this.currentUser, this.dateString, '')
  }

  onCreateCommentClick() {

  }
}
