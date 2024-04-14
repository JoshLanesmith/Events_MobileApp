import {Injectable} from '@angular/core';
import {User} from "../models/user.model";
import {Login} from "../models/login.model";
import {EventObject} from "../models/event.model";
import {SeedData} from "../models/seed-data";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  db: any;
  seedData: SeedData = new SeedData();

  private createDatabase(): Promise<any> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('EventsApp', 1);

      request.onerror = (event) => {
        console.error('Error in creating database!');
      }

      request.onsuccess = (event) => {
        console.log('onsuccess called');
        // @ts-ignore
        this.db = event.target.result;
        resolve(this.db);
      }

      request.onupgradeneeded = (event) => {
        console.log('onupgradeneeded called');
        console.log(event);
        // @ts-ignore
        this.db = event.target.result;
        const userStore = this.db.createObjectStore('users', {
          keyPath: 'id',
          autoIncrement: true,
        });
        const eventStore = this.db.createObjectStore('events', {
          keyPath: 'id',
          autoIncrement: true,
        });
        const commentStore = this.db.createObjectStore('comments', {
          keyPath: 'id',
          autoIncrement: true,
        });
        const loginStore = this.db.createObjectStore('logins', {
          keyPath: 'id',
          autoIncrement: true,
        });
        const userTypesStore = this.db.createObjectStore('usertypes', {
          keyPath: 'id',
          autoIncrement: true,
        });

        this.seedData.userTypesData.forEach((item) => {
          userTypesStore.add(item);
        });

        this.seedData.users.forEach((item) => {
          const req = userStore.add(item);
          req.onsuccess = (event: any) => {
            const userId = event.target.result;
            const login: Login = new Login(userId, 'password');

            loginStore.add(login);
          }
        })

        this.seedData.addGuestsToEvents();

        this.seedData.events.forEach((item) => {
          eventStore.add(item);
        })

        this.seedData.comments.forEach((item) => {
          commentStore.add(item);
        })


        userStore.createIndex('userNameIndex', 'userName', {unique: true});
        userTypesStore.createIndex("typesIndex", "type", {unique: true});
        loginStore.createIndex('userIdIndex', 'userId', {unique: true});

      }
    })
  }

  initDatabase() {
    this.createDatabase().then((data) => {
      console.log('database created successfully: ' + data);
    }).catch((err) => {
      console.log('Error in database creation: ' + err.message);
    })
  }

  constructor() {
  }
}
