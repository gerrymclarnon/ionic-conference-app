import {Injectable, NgZone} from '@angular/core';
import firebase from 'firebase';
import {Observable} from 'rxjs/Observable';
import {Player} from '../models/Player';

@Injectable()
export class ListService {

  constructor(public zone: NgZone) {
  }

  getList(): Observable<Player> {

    return Observable.create((observer: any) => {
      firebase.database().ref("/list")
        .on("value", (snapshot: any) => {
          let list: Array<Player> = [];
          snapshot.forEach((player: Player) => {
            // let listItemToPush = listItem.val();
            // listItemToPush.key = listItem.key;
            list.push(new Player(player.key, player.val().title, player.val().email));
          });
          this.zone.run(() => {
            observer.next(list);
          });
        });
    });
  }

  addListItem(listItem: any): Promise<any> {

    return new Promise((resolve, reject) => {
      firebase.database().ref("/list").push(listItem)
        .then(() => resolve())
        .catch(() => reject());
    });
  }

  updateListItem(listItem: any): Promise<any> {

    return new Promise((resolve, reject) => {
      firebase.database().ref("/list/" + listItem.key).update(listItem)
        .then(() => resolve())
        .catch(() => reject());
    });
  }

  removeListItem(listItem: any): Promise<any> {

    return new Promise((resolve, reject) => {
      firebase.database().ref("/list/" + listItem.key).remove()
        .then(() => resolve())
        .catch(() => reject());
    });
  }
}
