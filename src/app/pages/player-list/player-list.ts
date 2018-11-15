import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
// import {PlayerDetailPage} from "../player-detail/player-detail";

import {PlayerService} from '../../providers/player-service';

@Component({
  selector: 'page-player-list',
  templateUrl: 'player-list.html',
  encapsulation: ViewEncapsulation.None
})
export class PlayerListPage {
  players: any[] = [];

  constructor(
    public playerService: PlayerService,
    public router: Router) {

    this.playerService.getList().subscribe((data: any) => {
      this.players = data;
    });
  }

  gotoPlayerDetail(player: any) {
    this.router.navigateByUrl(
      `app/tabs/(players:player-details/${player.title})`
    );
  }

  addPlayer() {
    this.router.navigateByUrl(
      `app/tabs/(players:player-details/)`
    );

  }

}
