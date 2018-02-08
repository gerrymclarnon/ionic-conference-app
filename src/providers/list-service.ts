import {Injectable, NgZone} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {Player} from '../models/Player';

@Injectable()
export class ListService {

  public items: Observable<Player[]>;

  private PATH: string = "players";
  private firestore: AngularFirestore;
  private itemsCollection: AngularFirestoreCollection<Player>;

  constructor(public zone: NgZone, firestore: AngularFirestore) {
    this.firestore = firestore;
    this.itemsCollection = this.firestore.collection<Player>(this.PATH);
  }

  getList(): Observable<Player[]> {
    return this.itemsCollection.valueChanges();
  }

  getListItem(id: string): Observable<Player> {
    let itemDoc: AngularFirestoreDocument<Player> = this.firestore.doc<Player>(this.PATH + '/' + id);
    return itemDoc.valueChanges();
  }

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
