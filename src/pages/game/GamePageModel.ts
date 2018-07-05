import {Game} from "../../models/Game";

export class GamePageModel extends Game {
  get date(): string {
    return this.datetime.toISOString().substring(0, 10);
  }

  set date(value: string) {
    this.datetime = new Date(value);
  }

  get kickoff(): string {
    return this.datetime.toISOString();
  }

  set kickoff(value: string) {
    this.datetime = new Date(value);
  }

  constructor() {
    super(null, null, null, null, null);
  }

  public static createGame(object: Object): GamePageModel {
    return Object.assign(new GamePageModel(), object);
  }
}
