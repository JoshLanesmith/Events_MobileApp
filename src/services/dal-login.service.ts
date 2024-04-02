import {inject, Injectable} from '@angular/core';
import {DatabaseService} from "./database.service";

@Injectable({
  providedIn: 'root'
})
export class DalLoginService {
  database = inject(DatabaseService);

  constructor() { }

  select(userId: number | undefined): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(['logins'], 'readonly');
      transaction.oncomplete = (event: any) => {
        console.log("Success: select login transaction successful");
      }
      transaction.onerror = (event: any) => {
        console.log("Error: error in select login transaction");
      }

      const loginStore = transaction.objectStore('logins');

      const req = loginStore.index('userIdIndex').get(userId);
      req.onsuccess = (event:any) => {
        event.target.result ? resolve(event.target.result) : resolve(null);
      }
      req.onerror = (event: any) => {
        console.log("Error: error in select: " + event);
        reject(event);
      }

    })
  }
}
