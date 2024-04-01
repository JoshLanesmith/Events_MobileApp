export class User {
  id: number| undefined;
  firstName: string = "";
  lastName: string = "";
  userName: string = "";
  dob: string = "";
  email: string = "";
  mobileNumber: string = "";
  eventsRegisteredFor: EventReference[] = [];
  eventsHosted: EventReference[] = [];

  constructor(firstName: string, lastName: string, userName: string, dob: string, email: string, mobileNumber: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.dob = dob;
    this.email = email;
    this.mobileNumber = mobileNumber;
  }
}

export class EventReference {
  eventId: number| undefined;
  name: string = "";
  date: string = "";
  location: string = "";

  constructor() {
  }

}
