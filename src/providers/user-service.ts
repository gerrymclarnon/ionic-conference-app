import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class UserService {

    constructor() {}

    createUserWithEmailAndPassword ( email: string, password: string ) : Promise<any> {

        return new Promise( ( resolve, reject ) => {
            return firebase.auth().createUserWithEmailAndPassword( email, password )
                .then( ( user: any ) => user.sendEmailVerification() )
                .then( ( ) => resolve() )
                .catch( ( error: any ) => reject( error ) );
        })
    }

    signInWithEmailAndPassword ( email: string, password: string ) : Promise<any> {

        return new Promise( ( resolve, reject ) => {
            return firebase.auth().signInWithEmailAndPassword( email, password )
                .then( ( user: any ) => {
                    return user.emailVerified ? resolve() : reject( { message: "Please check your email to activate your account." } );
                })
                .catch( ( error: any ) => reject( error ) );
        })
    }

    sendPasswordResetEmail ( email: string ) : Promise<any> {

        return new Promise( ( resolve, reject ) => {
            return firebase.auth().sendPasswordResetEmail( email )
                .then( ( ) => resolve() )
                .catch( ( error: any ) => reject( error ) );
        });
    }
}
