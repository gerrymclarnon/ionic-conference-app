export class Game {
  id: string;
  title: string;
  location: string;
  sendInvites: boolean;

  constructor(title: string, location: string, sendInvites: boolean) {
    this.title = title;
    this.location = location;
    this.sendInvites = sendInvites;
  }
}
