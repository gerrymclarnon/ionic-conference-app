import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

// Providers
import { PlayerService } from '../../providers/player-service';
import {Player} from "../../models/Player";

@Component({
    selector: 'page-list',
    templateUrl: 'managers.html',
})
export class ManagersPage {

    newListItem: FormGroup;
    list: any = [];


    constructor ( public playerService: PlayerService,
                    public formBuilder: FormBuilder ) {

        this.newListItem = this.formBuilder.group({
            title: [ null, Validators.required ]
        });

        this.playerService.getManagerList().subscribe( (data: any ) => {
            this.list = data;
        });
    }

    addListItem () {
      this.playerService.addListItem(new Player(
        this.newListItem.value.title,
        this.newListItem.value.email,
        true))
        .then(() => {
          this.newListItem.reset();
          // this.navCtrl.push(PlayerListPage);
        })
        .catch((error: any) => console.error(error));
    }

    removeListItem ( listItem: any ) {

        this.playerService.removeListItem( listItem )
            .then( ( ) => {})
            .catch( ( error: any ) => console.error( error ) );
    }
}
