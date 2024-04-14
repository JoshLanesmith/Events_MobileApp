/*
Project: Event Horizon - Mobile Final Project
Josh Lanesmith and Alex Philippopoulos

Revision History:
  Created: 2024-03-21
 */
import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Comment, UserReference} from "../../models/comment.model";
import {DalCommentService} from "../../services/dal-comment.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-commentdetail',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './commentdetail.component.html',
  styleUrl: './commentdetail.component.css'
})
export class CommentdetailComponent {
  @Output() onCloseEditForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onUpdateComment: EventEmitter<Comment> = new EventEmitter<Comment>();
  @Output() onDeleteComment: EventEmitter<Comment> = new EventEmitter<Comment>();

  commentId: number = Number(localStorage.getItem('commentId'));
  currentUser: UserReference = new UserReference(
    Number(sessionStorage.getItem('userId')),
    String(sessionStorage.getItem('userName'))
  )
  comment: Comment = new Comment(this.currentUser, 0, 'this.dateString', '')

  dalComment = inject(DalCommentService);

  constructor() {
    console.log(this.commentId);
    this.dalComment.select(this.commentId)
      .then((data) => {
        this.comment = data
      })
      .catch((err) => {
        console.log(err);
      })
  }

  onUpdateCommentClick() {
    this.dalComment.update(this.comment)
      .then((data) => {
        this.onUpdateComment.emit(this.comment)
        this.onCloseEditForm.emit(false);
      })
      .catch((err) => {
        alert('Unable to update comment');
        this.onCloseEditForm.emit(false);
      })

  }

  onCancelCommentClick() {
    this.onCloseEditForm.emit(false);
  }

  onDeleteCommentClick() {
    let result = confirm("Are you sure you want to delete your comment?")

    if (result) {
      this.dalComment.delete(this.comment)
        .then((data) => {
          this.onDeleteComment.emit(this.comment)
          this.onCloseEditForm.emit(false);
        })
        .catch((err) => {

        })
    }
  }
}
