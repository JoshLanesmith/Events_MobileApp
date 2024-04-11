import {Component, Input} from '@angular/core';
import {Comment, UserReference} from "../../models/comment.model";

@Component({
  selector: 'app-commentshow',
  standalone: true,
  imports: [],
  templateUrl: './commentshow.component.html',
  styleUrl: './commentshow.component.css'
})
export class CommentshowComponent {
  currentUser: UserReference = new UserReference(
    Number(sessionStorage.getItem('userId')),
    String(sessionStorage.getItem('userName'))
  )
  @Input() comment: Comment = new Comment(this.currentUser, 0, 'this.dateString', '')

  onEditCommentClick() {

  }
}
