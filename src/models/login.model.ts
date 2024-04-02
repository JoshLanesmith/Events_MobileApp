export class Login {
  userId: number| undefined;
  pwd: string = "";

  constructor(userId: number, pwd: string) {
    this.userId = userId;
    this.pwd = pwd;
  }
}
