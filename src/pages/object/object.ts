import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

// Providers
import { ObjectService } from '../../providers/object-service';
import {PlayerListPage} from "../player-list/player-list";
import {Game} from "../../models/Game";

@Component({
    selector: 'page-object',
    templateUrl: 'object.html',
})
export class ObjectPage {

    newObject: FormGroup;
    object: any = {};

    constructor( public formBuilder: FormBuilder,
                    public objectService: ObjectService ) {

        this.newObject = this.formBuilder.group({
            title: [ null ],
            location: [ null ],
            sendInvites: [ true ]
        });

      this.objectService.getList().subscribe( ( data: any ) => {
        if (data && data.length > 0) {
          this.object = data[data.length - 1];
        }
      })
    }

    setEvent() {

      this.objectService.addListItem(new Game(
        this.newObject.value.title,
        this.newObject.value.location,
        this.newObject.value.sendInvites))
        .then(() => {
          // this.newListItem.reset();
          // this.navCtrl.push(PlayerListPage);
        })
        .catch((error: any) => console.error(error));

    }
}
