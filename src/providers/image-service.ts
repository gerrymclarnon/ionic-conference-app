import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class ImageService {

    constructor() {

    }

    getImageDownloadURL ( imagePath: string ) : Promise<any> {

        return new Promise( ( resolve, reject ) => {
            return firebase.storage().ref().child( imagePath ).getDownloadURL()
                .then( ( url: string ) => resolve( url ) )
                .catch( ( error: any ) => reject( error ) );
        });
    }

    uploadImage ( image: any ) {

        return new Promise( ( resolve, reject ) => {
            return firebase.storage().ref().child( image.name ).put( image )
            .then( ( ) => resolve() )
            .catch( ( error: any ) => reject( error ) );
        });
    }
}
