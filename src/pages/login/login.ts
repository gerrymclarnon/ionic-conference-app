import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';
import { UserService } from "../../providers/user-service";

import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: {username?: string, password?: string} = {};
  submitted = false;
  message: string;

  constructor(public navCtrl: NavController,
              public userData: UserData,
              public userService: UserService
  ) {

  }

  // onLogin(form: NgForm) {
  //   this.submitted = true;
  //
  //   if (form.valid) {
  //     this.userData.login(this.login.username);
  //     this.navCtrl.push(TabsPage);
  //   }
  // }


  onLogin () : Promise<any> {

    return this.userService.signInWithEmailAndPassword( this.login.username, this.login.password )
      .then( ( result: any ) => {
        // this.menuController.enable( true );
        // this.app.getRootNav().setRoot( TabsPage );
        this.userData.login(this.login.username);
        this.navCtrl.push(TabsPage);
      })
      .catch( ( error: any ) => {
        if ( error.message ) {
          this.message = error.message;
        }
        else {
          console.error( error );
        }
      });
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }
}
