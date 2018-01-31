import {Injectable, NgZone} from '@angular/core';
// import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {Player} from '../models/Player';

@Injectable()
export class ListService {

  public items: Observable<Player[]>;
  private itemsCollection: AngularFirestoreCollection<Player>;
  private firestore: AngularFirestore;

  constructor(public zone: NgZone, firestore: AngularFirestore) {
    this.firestore = firestore;
    this.itemsCollection = this.firestore.collection<Player>('list');
  }

  getList(): Observable<Player[]> {
    return this.itemsCollection.valueChanges();
  }

  // private itemDoc: AngularFirestoreDocument<Player>;
  // item: Observable<Player>;
  // getListItem(id: string): Observable<Player[]> {
  //   this.itemDoc = firestore.doc<Player>('list/' + id);
  //   this.item = this.itemDoc.valueChanges();
  // }

  // Firestore expects this for add...
  // this.itemsCollection.add({
  //   id: player.id,
  //   title: player.title,
  //   email: player.email
  // });
  addListItem(player: Player): Promise<void> {
    player.id = this.firestore.createId();

    return this.itemsCollection.doc(player.id).set(this.toJSON(player));
  }

  updateListItem(player: Player): Promise<void> {
    return this.itemsCollection.doc(player.id).update(this.toJSON(player));
  }

  removeListItem(player: Player): Promise<void> {
    return this.itemsCollection.doc(player.id).delete();
  }

  protected toJSON(player: Player) {
    return JSON.parse(JSON.stringify(player));
  }
}
