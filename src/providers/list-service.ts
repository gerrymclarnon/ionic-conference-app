import { Injectable, NgZone } from '@angular/core';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ListService {

    constructor ( public zone: NgZone ) {}

    getList () : Observable<any> {

        return Observable.create( ( observer: any ) => {
            firebase.database().ref( "/list" )
                .on( "value", ( snapshot: any ) => {
                    let list:Array<any> = [];
                    snapshot.forEach( ( listItem: any ) => {
                        let listItemToPush = listItem.val();
                        listItemToPush.key = listItem.key;
                        list.push( listItemToPush );
                    });
                    this.zone.run( () => {
                        observer.next( list );
                    });
                });
            });
    }

    addListItem ( listItem: any ) : Promise<any> {

        return new Promise( ( resolve, reject ) => {
            firebase.database().ref( "/list" ).push( listItem )
                .then( ( ) => resolve() )
                .catch( ( ) => reject() );
        });
    }

    removeListItem ( listItem: any ) : Promise<any> {

        return new Promise( ( resolve, reject ) => {
            firebase.database().ref( "/list/" + listItem.key ).remove()
                .then( ( ) => resolve() )
                .catch( ( ) => reject() );
        });
    }
}
