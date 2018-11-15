import {Player} from "./Player";

export class Game {
  id: string;
  title: string;
  location: string;
  datetime: Date;
  sendInvites: boolean;
  players: Array<Player>;

  constructor(title: string, location: string, datetime: Date, sendInvites: boolean, players: Array<Player>) {
    this.title = title;
    this.location = location;
    this.datetime = datetime;
    this.sendInvites = sendInvites;
    this.players = players;
  }
}
