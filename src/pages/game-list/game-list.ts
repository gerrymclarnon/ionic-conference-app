import {Component} from '@angular/core';
import {GameService} from '../../providers/game-service';
import {NavController} from "ionic-angular";
import {GamePage} from "../game/game";

@Component({
  selector: 'page-game-list',
  templateUrl: 'game-list.html',
})
export class GameListPage {

  games: any = [];

  constructor(public gameService: GameService, public navCtrl: NavController) {

    this.gameService.getList().subscribe((data: any) => {
      this.games = data;
    });
  }

  gotoPlayerDetail(game: any) {
    this.navCtrl.push(GamePage, {gameId: game.id, readonly: true});
  }

  addPlayer() {
    this.navCtrl.push(GamePage, {gameId: null, readonly: false});
  }

}
