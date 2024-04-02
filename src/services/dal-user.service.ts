import {inject, Injectable} from '@angular/core';
import {DatabaseService} from "./database.service";

@Injectable({
  providedIn: 'root'
})
export class DalUserService {
  database = inject(DatabaseService);

  constructor() { }

  select(userName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(['users'], 'readonly');
      transaction.oncomplete = (event: any) => {
        console.log("Success: select user transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in select user transaction: " + event);
      };

      const userStore = transaction.objectStore('users');

      const req = userStore.index('userNameIndex').get(userName);
      req.onsuccess = (event: any) => {
        event.target.result ? resolve(event.target.result) : resolve(null);
      };
      req.onerror = (event: any) => {
        console.log("Error: error in select user: " + event);
        reject(event);
      };
    })
  }
}
