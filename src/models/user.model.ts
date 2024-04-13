export class User {
  id: number| undefined;
  firstName: string = "";
  lastName: string = "";
  profileImg: any;
  userName: string = "";
  dob: string = "";
  email: string = "";
  mobileNumber: string = "";
  role: string | undefined;
  eventsRegisteredFor: EventReference[] = [];
  eventsHosted: EventReference[] = [];

  constructor(firstName: string, lastName: string, userName: string, dob: string,
              email: string, mobileNumber: string, role: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.dob = dob;
    this.email = email;
    this.mobileNumber = mobileNumber;
    this.role = role;
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
