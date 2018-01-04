import { Injectable, NgZone } from '@angular/core';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ObjectService {

    constructor( public zone: NgZone ) {

    }

    getObject () : Observable<any> {

        return Observable.create( ( observer: any ) => {
            firebase.database().ref( "/object" )
                .on( "value", ( snapshot: any ) => {
                    this.zone.run( () => {
                        observer.next( snapshot.val() ? snapshot.val() : {} );
                    });
                });
            });
    }

    setObject ( object: any ) : Promise<any> {

        return new Promise( ( resolve, reject ) => {
            return firebase.database().ref( "/object" ).set( object )
                .then( ( result: any  ) => resolve() )
                .catch( ( error: any ) => reject() );
        });
    }
}
