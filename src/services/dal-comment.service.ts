import {inject, Injectable} from '@angular/core';
import {DatabaseService} from "./database.service";
import {Comment} from "../models/comment.model";
import {EventObject} from "../models/event.model";
import {Login} from "../models/login.model";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class DalCommentService {
  database = inject(DatabaseService);

  constructor() {
  }

  insert(comment: Comment, currentEvent: EventObject): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const transaction = this.database.db.transaction(['comments', 'events'], 'readwrite');

      transaction.oncomplete = (event: any) => {
        console.log("Success: insert comment transaction successful")
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in insert comment transaction: " + event);
      };

      const commentStore = transaction.objectStore('comments');
      const eventStore = transaction.objectStore('events');

      const reqAddComment = commentStore.add(comment);

      reqAddComment.onsuccess = (event: any) => {
        //event.target.result ? resolve(event.target.result) : resolve(null);

        if (!currentEvent.commentIds) {
          currentEvent.commentIds = [];
        }

        let commentId: number = event.target.result as number;
        currentEvent.commentIds.push(event.target.result as number);

        const reqUpdateEvent = eventStore.put(currentEvent);

        reqUpdateEvent.onsuccess = (event: any) => {
          event.target.result ? resolve(commentId) : resolve(null);
        }
        reqUpdateEvent.onerror = (event: any) => {
          console.log("Error: error in update event while insert comment: " + event);
          reject(event);
        }
      }
      reqAddComment.onerror = (event: any) => {
        console.log("Error: error in insert comment: " + event);
        reject(event);
      }
    })
  }

  select(id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const transaction = this.database.db.transaction(['comments'], 'readonly');
      transaction.oncomplete = (event: any) => {
        console.log("Success: select user transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in select user transaction: " + event);
      };

      const commentStore = transaction.objectStore('comments');

      const req = commentStore.get(id);
      req.onsuccess = (event: any) => {
        event.target.result ? resolve(event.target.result) : resolve(null);
      };
      req.onerror = (event: any) => {
        console.log("Error: error in select user: " + event);
        reject(event);
      };

    })
  }

  selectAllByEventId(eventId: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const transaction = this.database.db.transaction(["comments"]);

      transaction.oncomplete = (event: any) => {
        console.log("Success: selectAll transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in selectAll transaction: " + event);
      };

      const commentStore = transaction.objectStore("comments");

      const commentCursor = commentStore.openCursor();

      let comments: Comment[] = [];
      commentCursor.onsuccess = (event: any) => {
        const cursor = event.target.result;

        if (cursor) {
          if (cursor.value.eventId === eventId) {
            comments.push(cursor.value);
          }

          cursor.continue();
        } else {
          resolve(comments);
        }
      }
      commentCursor.onerror = (event: any) => {
        console.log('Error: error in selectAll ' + event);
        reject(event);
      }
    })
  }

  update(comment: Comment): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const transaction = this.database.db.transaction(['comments'], 'readwrite');
      transaction.oncomplete = (event: any) => {
        console.log("Success: update comment transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in update comment transaction: " + event);
      };

      const commentStore = transaction.objectStore('comments');

      const req = commentStore.put(comment);
      req.onsuccess = (event: any) => {
        event.target.result ? resolve(event.target.result) : resolve(null);
      };
      req.onerror = (event: any) => {
        console.log("Error: error in update comment: " + event);
        reject(event);
      };
    })
  }

  delete(comment: Comment): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const transaction = this.database.db.transaction(['comments'], 'readwrite');

      transaction.oncomplete = (event: any) => {
        console.log("Success: delete comment transaction successful")
        event.target.result ? resolve(event.target.result) : resolve(null);
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in delete comment transaction: " + event);
        reject(event);
      };

      const commentStore = transaction.objectStore('comments');

      console.log('about to attempt to delete user');

      if (comment.id) {
        const req = commentStore.delete(comment.id);

        req.onsuccess = (event: any) => {
          console.log('comment deleted');
          event.target.result ? resolve(event.target.result) : resolve(null);

        }
      } else {
        reject("comment does not have id")
      }
    })
  }
}
