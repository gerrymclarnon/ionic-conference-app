import {Injectable, NgZone} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
// import { AngularFireDatabase } from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Player} from '../models/Player';

@Injectable()
export class ListService {

  private itemsCollection: AngularFirestoreCollection<Player>;
  items: Observable<Player[]>;

  constructor(public zone: NgZone, db: AngularFirestore) {
    this.db = db;
    this.itemsCollection = db.collection<Player>('list');
  }

  getList(): Observable<Player[]> {
    return this.itemsCollection.valueChanges();
  }

  // addListItem(player: Player): Promise<any> {

  // Use a modified JSON.stringify(player) as id must be first object
  // this.itemsCollection.add({
  //   id: player.id,
  //   title: player.title,
  //   email: player.email
  // });
  addListItem(player: Player): Promise<void> {
    player.id = this.db.createId();

    return this.itemsCollection.doc(player.id).set(JSON.parse(JSON.stringify(player)));
  }

  // updateListItem(listItem: any): Promise<any> {
  //
  //   return new Promise((resolve, reject) => {
  //     firebase.database().ref("/list/" + listItem.key).update(listItem)
  //       .then(() => resolve())
  //       .catch(() => reject());
  //   });
  // }
  updateListItem(player: Player): Promise<void> {
    return this.itemsCollection.doc(player.id).update(JSON.parse(JSON.stringify(player)));
  }

  // removeListItem(listItem: any): Promise<any> {
  //
  //   return new Promise((resolve, reject) => {
  //     firebase.database().ref("/list/" + listItem.key).remove()
  //       .then(() => resolve())
  //       .catch(() => reject());
  //   });
  // }
  removeListItem(player: Player): Promise<void> {
    return this.itemsCollection.doc(player.id).delete();
  }

}
