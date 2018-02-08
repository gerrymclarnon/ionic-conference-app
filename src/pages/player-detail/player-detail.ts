import {Component, NgZone} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
// Providers
import {ListService} from '../../providers/list-service';
import {NavController, ViewController, NavParams} from "ionic-angular";
import {PlayerListPage} from "../../pages/player-list/player-list";

import {Player} from "../../models/Player";

@Component({
  selector: 'page-player-detail',
  templateUrl: 'player-detail.html',
})
export class PlayerDetailPage {

  newListItem: FormGroup;
  player: any = {};
  playerId: any;
  readonly: boolean = false;

  constructor(public listService: ListService,
              public formBuilder: FormBuilder,
              public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public zone:NgZone) {

    this.readonly = navParams.data.readonly || true;
    this.playerId = navParams.data.playerId;

    this.newListItem = this.formBuilder.group({
      title: [this.player.title, Validators.required],
      email: [this.player.email, Validators.email]
    });

    if (this.playerId) {
      this.listService.getListItem(this.playerId).subscribe((data: any) => {
        this.player = data;

        if (this.player) {
          this.newListItem.setValue({
            title: this.player.title,
            email: this.player.email
          });
        }
      });
    }
  }

  ionViewWillEnter() {
    this.setBackButtonText(this.readonly);
  }

  toggleReadonly() {
    this.readonly = !this.readonly;
    this.setBackButtonText(this.readonly);
  }

  // TODO: workaround the hidden back button when page refreshed due to nothing in History object!
  private setBackButtonText(readonly: boolean) {
    this.zone.run(() => {
      let backButtonText = readonly ? 'Players' : 'Cancel';
      this.viewCtrl.setBackButtonText(backButtonText);
    });
  }

  // TODO: move to listService?
  save() {
    if (this.player.id) {
      this.updateListItem();
    } else {
      this.addListItem();
    }
  }

  addListItem() {
    this.listService.addListItem(new Player(
      this.newListItem.value.title,
      this.newListItem.value.email))
      .then(() => {
        this.newListItem.reset();
        this.navCtrl.push(PlayerListPage);
      })
      .catch((error: any) => console.error(error));
  }

  updateListItem() {
    // Replace with 2-way binding?
    let player: Player = new Player(
      this.newListItem.value.title,
      this.newListItem.value.email
    );
    player.id  = this.player.id;

    this.listService.updateListItem(player)
      .then(() => {
        this.newListItem.reset();
        this.navCtrl.pop();
      })
      .catch((error: any) => console.error(error));
  }

  removeListItem() {
    this.listService.removeListItem(this.player)
      .then(() => {
        this.navCtrl.pop();
      })
      .catch((error: any) => console.error(error));
  }
}
