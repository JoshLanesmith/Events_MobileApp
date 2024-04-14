import {inject, Injectable} from '@angular/core';
import {DatabaseService} from "./database.service";
import {EventObject} from "../models/event.model";

@Injectable({
  providedIn: 'root'
})
export class DalEventService {
  database = inject(DatabaseService);
  constructor() { }
  insert(event: EventObject): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["events"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: insert transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in insert transaction: " + event);
      };

      const eventStore = transaction.objectStore("events");
      const req = eventStore.add(event);

      req.onsuccess = (event: any) => {
        //returns the key of newly added item
        console.log(`Success: event added successfully ${event.target.result}`);
        resolve(event.target.result);
      };

      req.onerror = (event: any) => {
        console.log("Error: error in add: " + event);
        reject(event);
      };
    });
  }
  selectAll(): Promise<EventObject[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["events"], 'readonly');

      transaction.oncomplete = (event: any) => {
        console.log("Success: selectAll transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in selectAll transaction: " + event);
      };

      const eventStore = transaction.objectStore("events");

      //Preferred way..
      //             const friendCursor = friendsStore.openCursor();
      //
      //             let books: Book[] = [];
      //             friendCursor.onsuccess = (event: any) => {
      //                 const cursor = event.target.result;
      //                 // console.log(cursor);
      //                 if (cursor) {
      //                     // console.log(`Name ${cursor.key} is ${cursor.value.name}`);
      //                     books.push(cursor.value);
      //                     cursor.continue();
      //                 } else {
      //                     // console.log("No more entries!");
      //                     resolve(books);
      //                 }
      //             };

      //also works.. (easy way)

      const req = eventStore.getAll();
      req.onsuccess = (event: any) => {
        resolve(event.target.result);
      };
      req.onerror = (event: any) => {
        console.log("Error: error in select: " + event);
        reject(event);
      };


    });
  }
  select(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["events"]); //readonly

      transaction.oncomplete = (event: any) => {
        console.log("Success: select transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in select transaction: " + event);
      };

      const eventStore = transaction.objectStore("events");

      const req = eventStore.get(id);
      req.onsuccess = (event: any) => {
        event.target.result ? resolve(event.target.result) : resolve(null);
      };
      req.onerror = (event: any) => {
        console.log("Error: error in select: " + event);
        reject(event);
      };
    });

  }
  update(event: EventObject): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["events"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: update transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in update transaction: " + event);
      };

      const eventStore = transaction.objectStore("events");

      const reqUpdate = eventStore.put(event);

      reqUpdate.onsuccess = (event: any) => {
        console.log(`Success: data updated successfully: ${event}`);
        resolve(event);
      };

      reqUpdate.onerror = (event: any) => {
        console.log(`Error: failed to update: ${event}`);
        reject(event)
      };
    });
  }


  delete(eventObject: EventObject): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["events", "comments"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: delete transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in delete transaction: " + event);
      };

      const eventStore = transaction.objectStore("events");
      const commentStore = transaction.objectStore("comments");

      if (eventObject.id) {
        const commentCursor = commentStore.openCursor();

        commentCursor.onsuccess = (event: any) => {
          const cursor = event.target.result != null ? event.target.result : false;

          if (cursor) {
            if (cursor.value.eventId){
              const commentReq = cursor.delete();
              commentReq.onerror = (event: any) => {
                reject('Unable to delete comments');
              }
            }

            cursor.continue();
          } else {
            const eventReq = eventStore.delete(eventObject.id);

            eventReq.onsuccess = (event: any) => {
              console.log(`Success: data deleted successfully: ${event}`);
              resolve(event);
            }
            eventReq.onerror = (event: any) => {
              console.log(`Error: failed to delete: ${event}`);
              reject(event);
            }
          }
        }
      } else {
        reject("Event does not have id")
      }

    });

  }

  deleteAll(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const transaction = this.database.db.transaction(['events'], 'readwrite');

      transaction.oncomplete = (event: any) => {
        console.log("Success: delete all events transaction successful")
        event.target.result ? resolve(event.target.result) : resolve(null);
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in delete all events transaction: " + event);
      };

      const eventStore = transaction.objectStore('events');

      const req = eventStore.clear();

      req.onsuccess = (event: any) => {
        console.log('all events deleted');
        event.target.result ? resolve(event.target.result) : resolve(null);
      }
      req.onerror = (event: any) => {
        console.log('error in deleting events');
        reject(event);
      }
    })
  }
}
