import {inject, Injectable} from '@angular/core';
import {DatabaseService} from "./database.service";
import {User} from "../models/user.model";
import {Login} from "../models/login.model";

@Injectable({
  providedIn: 'root'
})
export class DalUserService {
  database = inject(DatabaseService);

  constructor() {
  }

  insert(user: User, pwd: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(['users', 'logins'], 'readwrite');
      transaction.oncomplete = (event: any) => {
        console.log("Success: insert user and login transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in insert user and login transaction: " + event);
      };

      const userStore = transaction.objectStore('users');
      const loginStore = transaction.objectStore('logins');

      const req = userStore.add(user);

      req.onsuccess = (event: any) => {
        const login: Login = new Login(Number(event.target.result), pwd);
        loginStore.add(login);
      }

      transaction.oncomplete = (event: any) => {
        console.log("Success: insert user transaction successful")
        event.target.result ? resolve(event.target.result) : resolve(null);
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in insert user transaction: " + event);
        reject(event);
      };

    })
  }

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
