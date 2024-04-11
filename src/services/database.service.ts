import {Injectable} from '@angular/core';
import {User} from "../models/user.model";
import {Login} from "../models/login.model";
import {EventObject} from "../models/event.model";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  db: any;

  userTypesData = [
    {type: 'user'},
    {type: 'admin'},
  ];


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

        this.userTypesData.forEach((item) => {
          userTypesStore.add(item);
        });

        userStore.createIndex('userNameIndex', 'userName', {unique: true});
        userTypesStore.createIndex("typesIndex", "type", {unique: true});
        loginStore.createIndex('userIdIndex', 'userId', {unique: true});

        // Identify 'admin' object and create default admin user
        const userTypeRequest = userTypesStore.index('typesIndex').get('admin');
        userTypeRequest.onsuccess = (event: any) => {
          const userTypeAdmin = event.target.result;
          // Create default admin user
          const defaultAdminUser = new User('admin', 'admin', 'admin', '', '', '', userTypeAdmin.id);

          // Add default admin user to userStore
          const addUserRequest = userStore.add(defaultAdminUser);
          addUserRequest.onsuccess = (event: any) => {
            const userAdminId = event.target.result;
            const defaultAdminLogin = new Login(userAdminId, 'admin');
            const defaultEvent: EventObject = new EventObject('Conestoga Event', '2024-04-12', '108 University Ave, Waterloo, ON',
              'Event for all students', 100, 0, userAdminId);

            const addLoginRequest = loginStore.add(defaultAdminLogin);
            addLoginRequest.onsuccess = () => {
              console.log('Default admin login added successfully');

              const addEventRequest = eventStore.add(defaultEvent);
              addEventRequest.onsuccess = () => {
                console.log('Default event added successfully');
              }
              addEventRequest.onerror = () => {
                console.error('Error adding event');
              }
            }
            addLoginRequest.onerror = () => {
              console.error('Default admin login added successfully');
            }
          }
          addUserRequest.onerror = () => {
            console.error('Error adding default admin user');
          }
        }
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
