import { Injectable, NgZone } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import {Game} from "../models/Game";

@Injectable()
export class ObjectService {

  public items: Observable<Game[]>;

  private PATH: string = "games";
  private firestore: AngularFirestore;
  private itemsCollection: AngularFirestoreCollection<Game>;

  constructor(firestore: AngularFirestore) {
    this.firestore = firestore;
    this.itemsCollection = this.firestore.collection<Game>(this.PATH);
  }

  getList(): Observable<Game[]> {
    return this.itemsCollection.valueChanges();
  }

  getListItem(id: string): Observable<Game> {
    let itemDoc: AngularFirestoreDocument<Game> = this.firestore.doc<Game>(this.PATH + '/' + id);
    return itemDoc.valueChanges();
  }

  addListItem(Game: Game): Promise<void> {
    Game.id = this.firestore.createId();
    return this.itemsCollection.doc(Game.id).set(this.toJSON(Game));
  }

  updateListItem(Game: Game): Promise<void> {
    return this.itemsCollection.doc(Game.id).update(this.toJSON(Game));
  }

  removeListItem(Game: Game): Promise<void> {
    return this.itemsCollection.doc(Game.id).delete();
  }

  protected toJSON(Game: Game) {
    return JSON.parse(JSON.stringify(Game));
  }
}
