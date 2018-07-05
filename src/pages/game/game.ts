import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

import {GameService} from '../../providers/game-service';
import {PlayerService} from '../../providers/player-service';

import {Game} from "../../models/Game";
import {GamePageModel} from "./GamePageModel";
import {Player} from "../../models/Player";
import {PlayerDetailPage} from "../player-detail/player-detail";
import {NavController} from "ionic-angular";

@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  gameFormGroup: FormGroup;
  game: GamePageModel;
  allPlayers: Array<Player>;

  constructor(public navCtrl: NavController,
              public formBuilder: FormBuilder,
              public gameService: GameService,
              public playerService: PlayerService) {

    this.gameFormGroup = this.formBuilder.group({
      title: [null],
      location: [null],
      date: [null],
      kickoff: [null],
      sendInvites: [true],
      players: [null]
    });

    this.gameService.getList().subscribe((data: Game[]) => {
      if (data && data.length > 0) {
        this.game = GamePageModel.createGame(data[data.length - 1]);

        // TODO: replace the built in patch value with custom one that works
        // this.gameFormGroup.patchValue(this.game);
        this.gameFormGroup.controls['title'].setValue(this.game.title);
        this.gameFormGroup.controls['location'].setValue(this.game.location);
        this.gameFormGroup.controls['date'].setValue(this.game.date);
        this.gameFormGroup.controls['kickoff'].setValue(this.game.kickoff);
        this.gameFormGroup.controls['sendInvites'].setValue(this.game.sendInvites);
        this.gameFormGroup.controls['players'].setValue(this.game.players);
      }
    });

    this.playerService.getList().subscribe((players: Player[]) => {
      this.allPlayers = players;
    });
  }

  addGame() {

    let datetime: Date = new Date(this.gameFormGroup.value.date);
    let kickoff: Date = new Date(this.gameFormGroup.value.kickoff);
    datetime.setHours(kickoff.getHours(), kickoff.getMinutes());

    this.gameService.addListItem(new Game(
      this.gameFormGroup.value.title,
      this.gameFormGroup.value.location,
      datetime,
      true,
      this.players))
      .then(() => {
        // this.newListItem.reset();
        // this.navCtrl.push(PlayerListPage);
      })
      .catch((error: any) => console.error(error));

  }

  gotoPlayerDetail(player: any) {
    this.navCtrl.push(PlayerDetailPage, {playerId: player.id, readonly: true});
  }

}
