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
    return new Promise<any>((resolve, reject) => {
      const transaction = this.database.db.transaction(['users', 'logins'], 'readwrite');

      transaction.oncomplete = (event: any) => {
        console.log("Success: insert user transaction successful")
        event.target.result ? resolve(event.target.result) : resolve(null);
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in insert user transaction: " + event);
        reject(event);
      };

      const userStore = transaction.objectStore('users');
      const loginStore = transaction.objectStore('logins');

      const req = userStore.add(user);

      req.onsuccess = (event: any) => {
        const login: Login = new Login(Number(event.target.result), pwd);
        loginStore.add(login);
      };
      req.onerror = (event: any) => {
        console.log("Error: error in insert user: " + event);
        reject(event);
      };

    })
  }

  selectByUsername(userName: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
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

  selectById(id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const transaction = this.database.db.transaction(['users'], 'readonly');
      transaction.oncomplete = (event: any) => {
        console.log("Success: select user transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in select user transaction: " + event);
      };

      const userStore = transaction.objectStore('users');

      const req = userStore.get(id);
      req.onsuccess = (event: any) => {
        event.target.result ? resolve(event.target.result) : resolve(null);
      };
      req.onerror = (event: any) => {
        console.log("Error: error in select user: " + event);
        reject(event);
      };
    })
  }

  selectAll(listOfIds?: number[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const transaction = this.database.db.transaction(["users"]);

      transaction.oncomplete = (event: any) => {
        console.log("Success: selectAll transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in selectAll transaction: " + event);
      };

      const userStore = transaction.objectStore('users');
      const userCursor = userStore.openCursor();

      let users: User[] = [];
      userCursor.onsuccess = (event: any) => {
        const cursor = event.target.result;

        if (cursor) {
          if (!listOfIds || listOfIds.includes(cursor.value.id)) {
            users.push(cursor.value);
          }

          cursor.continue();
        } else {
          resolve(users);
        }
      }
      userCursor.onerror = (event: any) => {
        console.log('Error: error in selectAll ' + event);
        reject(event);
      }

    })
  }

  update(user: User): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const transaction = this.database.db.transaction(['users'], 'readwrite');
      transaction.oncomplete = (event: any) => {
        console.log("Success: update user transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in update user transaction: " + event);
      };

      const userStore = transaction.objectStore('users');

      const req = userStore.put(user);
      req.onsuccess = (event: any) => {
        event.target.result ? resolve(event.target.result) : resolve(null);
      };
      req.onerror = (event: any) => {
        console.log("Error: error in update user: " + event);
        reject(event);
      };

    })
  }

  delete(user: User): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const transaction = this.database.db.transaction(['users', 'logins'], 'readwrite');

      transaction.oncomplete = (event: any) => {
        console.log("Success: delete user transaction successful")
        event.target.result ? resolve(event.target.result) : resolve(null);
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in delete user transaction: " + event);
        reject(event);
      };

      const userStore = transaction.objectStore('users');
      const loginStore = transaction.objectStore('logins');

      console.log('about to attempt to delete user');

      if (user.id) {
        const userReq = userStore.delete(user.id);

        console.log('user deleted');

        userReq.onsuccess = (event: any) => {
          let loginReq = loginStore.index('userIdIndex').get(user.id);
          console.log('user deleted and got login')

          loginReq.onsuccess = (event: any) => {
            let login = event.target.result;

            loginStore.delete(login.id);
          }
        }
      }
      else{
        reject("user does not have id")
      }
    })
  }

  deleteAll(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const transaction = this.database.db.transaction(['users', 'logins'], 'readwrite');

      transaction.oncomplete = (event: any) => {
        console.log("Success: delete all comments transaction successful")
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in delete all comments transaction: " + event);
      };

      const userStore = transaction.objectStore('users');
      const loginStore = transaction.objectStore('logins');

      const userReq = userStore.clear();

      console.log('user deleted');

      userReq.onsuccess = (event: any) => {
        let loginReq = loginStore.clear();

        loginReq.onsuccess = (event: any) => {
          console.log('all users deleted');
          event.target.result ? resolve(event.target.result) : resolve(null);
        }
        loginReq.onerror = (event: any) => {
          console.log('error in deleting users');
          reject(event);
        }
      }
    })
  }

}
