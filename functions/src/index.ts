/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailer = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

admin.initializeApp(functions.config().firebase);

exports.sendMatchInviteEmail = functions.firestore.document('/games/{uid}').onWrite((change, context) => {

  const game = change.after.data();
  const hbs = fs.readFileSync(path.join(__dirname, 'game.hbs'), 'utf8');
  const template = handlebars.compile(hbs);
  const db = admin.firestore();

  const inviteRef = db.collection('invites').add({
    name: 'Friday Night Footie Invite'
  }).then(invite => {
    console.log("inviteRef 1 = " + inviteRef);
    console.log('Added invite with ID: ', invite.id);

    const data = {
      game: game,
      invite: invite,
      player: game.players[0]
    };

    const html = template(data);

    const mailOptions = {
      to: 'gerry@mclarnonworld.com',
      subject: `New ${data.game.title}@${data.game.location} added`,
      text: 'Are you up for a game?',
      html: html
    };

    mailer.sendMail(mailOptions).then(() => {
      console.log(`New game invite ${invite.id} email sent to: ${mailOptions.to}`);
    });
  }).catch(error => {
    console.log(error);
  });

  console.log("inviteRef 2 = " + inviteRef);

  return inviteRef;
});


// Sends an email confirmation when a user changes his mailing list subscription.
// exports.sendEmailConfirmation = functions.database.ref('/users/{uid}').onWrite(event => {
//   const snapshot = event.data;
//   const val = snapshot.val();
//
//   if (!snapshot.changed('subscribedToMailingList')) {
//     return;
//   }
//
//
//   const mailOptions = {
//     to: val.email
//   };
//
//   console.log(`username/password = ${gmailEmail}:${gmailPassword}`);
//
// // The user just subscribed to our newsletter.
//   if (val.subscribedToMailingList) {
//     mailOptions.subject = 'Thanks and Welcome!';
//     mailOptions.text = 'Thanks you for subscribing to our newsletter. You will receive our next weekly newsletter.';
//     return mailTransport.sendMail(mailOptions).then(() => {
//       console.log('New subscription confirmation email sent to:', val.email);
//     });
//   }
//
//   // The user unsubscribed to the newsletter.
//   mailOptions.subject = 'Sad to see you go :`(';
//   mailOptions.text = 'I hereby confirm that I will stop sending you the newsletter.';
//   return mailTransport.sendMail(mailOptions).then(() => {
//     console.log('New unsubscription confirmation email sent to:', val.email);
//   });
// });

// const sendgridApikey = functions.config().sendgrid.apikey;
// const sgMail = require('@sendgrid/mail');


// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// sgMail.setApiKey(`${sendgridApikey}`);
// const msg = {
//   to: 'gerry@mclarnonworld.com',
//   from: 'gerry@mclarnonworld.com',
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
//
// return sgMail.send(msg).then(() => {
//   console.log('New game invite email sent with Sendgrid:');
// });

