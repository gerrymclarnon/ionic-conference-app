import {Component, NgZone} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
// Providers
import {ListService} from '../../providers/list-service';
import {NavController, ViewController, NavParams} from "ionic-angular";
import {PlayerListPage} from "../../pages/player-list/player-list";

@Component({
  selector: 'page-player-detail',
  templateUrl: 'player-detail.html',
})
export class PlayerDetailPage {

  newListItem: FormGroup;
  player: any;
  readonly: boolean = false;

  constructor(public listService: ListService,
              public formBuilder: FormBuilder,
              public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public zone:NgZone) {

    this.readonly = navParams.data.readonly;
    this.player = navParams.data.player ? navParams.data.player : {title: ""};

    this.newListItem = this.formBuilder.group({
      title: [this.player.title, Validators.required],
      email: [this.player.email, Validators.email]
    });

  }

  ionViewWillEnter() {
    this.setbackButtonText(this.readonly);
  }

  toggleReadonly() {
    this.readonly = !this.readonly;
    this.setbackButtonText(this.readonly);
  }

  private setbackButtonText(readonly: boolean) {
    this.zone.run(() => {
      if (!readonly) {
        this.viewCtrl.setBackButtonText('Cancel');
      }
    });
  }

  save() {
    if (this.player.key) {
      this.updateListItem();
    } else {
      this.addListItem();
    }
  }

  addListItem() {
    this.listService.addListItem({
      title: this.newListItem.value.title,
      email: this.newListItem.value.email
    })
      .then(() => {
        this.newListItem.reset();
        this.navCtrl.push(PlayerListPage);
      })
      .catch((error: any) => console.error(error));
  }

  updateListItem() {
    this.listService.updateListItem({
      key: this.player.key,
      title: this.newListItem.value.title,
      email: this.newListItem.value.email
    })
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
