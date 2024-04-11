import {inject, Injectable} from '@angular/core';
import {DatabaseService} from "./database.service";
import {Comment} from "../models/comment.model";
import {EventObject} from "../models/event.model";
import {Login} from "../models/login.model";

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

        console.log(event.target.result)
        if (!currentEvent.commentIds) {
          currentEvent.commentIds = [];
        }
        currentEvent.commentIds.push(event.target.result as number);

        const reqUpdateEvent = eventStore.put(currentEvent);

        reqUpdateEvent.onsuccess = (event: any) => {
          event.target.result ? resolve(event.target.result) : resolve(null);
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


}
