import {inject, Injectable} from '@angular/core';
import {DatabaseService} from "./database.service";

@Injectable({
  providedIn: 'root'
})
export class DalEventService {
  database = inject(DatabaseService);
  constructor() { }
  insert(event: Event): Promise<any> {
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
}
