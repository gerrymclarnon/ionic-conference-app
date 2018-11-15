import {Component} from '@angular/core';
import {PlayerService} from '../../providers/player-service';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Player} from "../../models/Player";

@Component({
  selector: 'player-detail',
  templateUrl: './player-detail.page.html',
  styleUrls: ['./player-detail.page.scss'],
})
export class PlayerDetailPage {

  newListItem: FormGroup;
  player: any = {};
  playerId: any;
  readonly: boolean = true;

  constructor(
    public playerService: PlayerService,
    public formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.playerId = this.route.snapshot.paramMap.get('playerId');
    this.readonly = this.playerId != "";

    if (this.playerId && this.playerId != "") {
      this.playerService.getListItem(this.playerId).subscribe((data: any) => {
        this.player = data;

        if (this.player) {
          this.newListItem.setValue({
            title: this.player.title,
            email: this.player.email
          });
        }
      });
    } else {
      this.player = new Player("", "", "");
    }

    this.newListItem = this.formBuilder.group({
      title: [this.player.title, Validators.required],
      email: [this.player.email, Validators.email]
    });
  }

  ionViewWillEnter() {
    // this.setBackButtonText(this.readonly);
  }

  toggleReadonly() {
    this.readonly = !this.readonly;
    // this.setBackButtonText(this.readonly);
  }

  // TODO: workaround the hidden back button when page refreshed due to nothing in History object!
  // private setBackButtonText(readonly: boolean) {
  //   this.zone.run(() => {
  //     let backButtonText = readonly ? 'Players' : 'Cancel';
  //     this.viewCtrl.setBackButtonText(backButtonText);
  //   });
  // }

  // TODO: move to playerService?
  save() {
    if (this.player && this.player.id) {
      this.updateListItem();
    } else {
      this.addListItem();
    }
  }

  addListItem() {
    this.playerService.addListItem(new Player(
      this.newListItem.value.title,
      this.newListItem.value.email,
    false))
      .then(() => {
        this.newListItem.reset();
        this.router.navigateByUrl(
          `app/tabs/(players:players)`
        );
      })
      .catch((error: any) => console.error(error));
  }

  updateListItem() {
    // Replace with 2-way binding?
    let player: Player = new Player(
      this.newListItem.value.title,
      this.newListItem.value.email,
      false
    );
    player.id  = this.player.id;

    this.playerService.updateListItem(player)
      .then(() => {
        this.newListItem.reset();
        this.router.navigateByUrl(
          `app/tabs/(players:players)`
        );            })
      .catch((error: any) => console.error(error));
  }

  removeListItem() {
    this.playerService.removeListItem(this.player)
      .then(() => {
        this.router.navigateByUrl(
          `app/tabs/(players:players)`
        );
      })
      .catch((error: any) => console.error(error));
  }

}
