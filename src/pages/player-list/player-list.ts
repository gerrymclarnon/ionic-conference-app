import {Component} from '@angular/core';
import {ListService} from '../../providers/list-service';
import {NavController} from "ionic-angular";
import {PlayerDetailPage} from "../player-detail/player-detail";

@Component({
  selector: 'page-player-list',
  templateUrl: 'player-list.html',
})
export class PlayerListPage {

  players: any = [];

  constructor(public listService: ListService, public navCtrl: NavController) {

    this.listService.getList().subscribe((data: any) => {
      this.players = data;
    });
  }

  gotoPlayerDetail(player: any) {
    this.navCtrl.push(PlayerDetailPage, {player: player, readonly: true});
  }

  addPlayer() {
    this.navCtrl.push(PlayerDetailPage, {player: null, readonly: false});
  }

}
