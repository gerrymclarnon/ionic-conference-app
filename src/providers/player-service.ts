import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {Player} from '../models/Player';

@Injectable()
export class PlayerService {

  public items: Observable<Player[]>;

  private PATH: string = "players";
  private firestore: AngularFirestore;
  private players: AngularFirestoreCollection<Player>;
  private managers: AngularFirestoreCollection<Player>;

  constructor(firestore: AngularFirestore) {
    this.firestore = firestore;
    // this.players = this.firestore.collection<Player>(this.PATH);
    this.players = this.firestore.collection("players", ref => ref.orderBy('email'));
    this.managers = this.firestore.collection("players", ref => ref.where('manager', '==', true).orderBy('email'));
  }

  getList(): Observable<Player[]> {
    return this.players.valueChanges();
  }

  getManagerList(): Observable<Player[]> {
    return this.managers.valueChanges();
  }

  getListItem(id: string): Observable<Player> {
    let itemDoc: AngularFirestoreDocument<Player> = this.firestore.doc<Player>(this.PATH + '/' + id);
    return itemDoc.valueChanges();
  }

  addListItem(player: Player): Promise<void> {
    return this.players.doc(player.email).set(Object.assign({}, player));
  }

  updateListItem(player: Player): Promise<void> {
    return this.players.doc(player.id).update(Object.assign({}, player));
  }

  removeListItem(player: Player): Promise<void> {
    return this.players.doc(player.id).delete();
  }
}
