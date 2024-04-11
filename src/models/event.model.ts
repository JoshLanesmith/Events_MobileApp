export class EventObject {
  id: number| undefined
  name: string = "";
  date: string = "";
  location: string = "";
  description: string = "";
  capacity: number = 0;
  guestCount: number = 0;
  adminId: number = 0;
  commentIds: number[] = [];

  constructor(name: string, date: string, location: string, description: string, capacity: number, guestCount: number, adminId: number) {
    this.name = name;
    this.date = date;
    this.location = location;
    this.description = description;
    this.capacity = capacity;
    this.guestCount = guestCount;
    this.adminId = adminId;
  }
}
