export class Comment {
  id: number | undefined;
  user: UserReference;
  date: string;
  text: string;

  constructor(user: UserReference, date: string, text: string) {
    this.user = user;
    this.date = date;
    this.text = text;
  }
}

export class UserReference {
  userId: number;
  userName: string;

  constructor(userId: number, userName: string) {
    this.userId = userId;
    this.userName = userName;
  }
}
