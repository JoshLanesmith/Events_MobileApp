import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Comment, UserReference} from "../../models/comment.model";
import {CommentdetailComponent} from "../commentdetail/commentdetail.component";

@Component({
  selector: 'app-commentshow',
  standalone: true,
  imports: [
    CommentdetailComponent
  ],
  templateUrl: './commentshow.component.html',
  styleUrl: './commentshow.component.css'
})
export class CommentshowComponent {
  currentUser: UserReference = new UserReference(
    Number(sessionStorage.getItem('userId')),
    String(sessionStorage.getItem('userName'))
  )
  @Input() comment: Comment = new Comment(this.currentUser, 0, 'this.dateString', '')
  @Output() onDeleteComment: EventEmitter<Comment> = new EventEmitter<Comment>();

  editMode: boolean = false;

  onEditCommentClick() {
    this.editMode = true;
    localStorage.setItem('commentId', `${this.comment.id}`)
  }

  closeEditForm(param: any) {
    this.editMode = param;
  }

  updateComment(param: any) {
    this.comment = param;
  }

  deleteComment(param: any) {
    this.onDeleteComment.emit(param);
  }
}
