import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { Storage } from '@ionic/storage';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
// import { FCM } from '@ionic-native/fcm/ngx';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { Badge } from '@ionic-native/badge/ngx';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-phone-auth',
  templateUrl: './phone-auth.page.html',
  styleUrls: ['./phone-auth.page.scss'],
})
export class PhoneAuthPage implements OnInit {
  number: string;
  result: any;
  user_token: any;
  fcm_token: any;
  badge_number: number;

  connectedBarColor='connectedBarColorNone'
  registrationValueOne = 'selectIcon';
  registrationValueTwo = 'unselectIcon';
  registrationValueThree = 'unselectIcon';

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private firebaseAuthentication: FirebaseAuthentication,
    public toastCtrl: ToastController,
    private afs: AngularFirestore,
    private storage: Storage,
    private fcm: FCM,
    private platform: Platform,
    private badge: Badge
  ) { }

  ngOnInit() {
    this.storage.create();
    this.platform.ready().then(() => {
      // get FCM token
      this.fcm.getToken().then(token => {
        console.log(token);
      });

      this.badge.set(0);
      this.fcm.onNotification().subscribe(data => {
        console.log(data);

        if (data.wasTapped == false) {
          this.badge.increase(1);
        } else {
          this.badge.clear();
        }
      })
    });
  }

  sendOtp() {
    console.log(this.number)
    this.firebaseAuthentication.verifyPhoneNumber('+959' + this.number, 20000).then(verificationId => {
      console.log(this.number)
      alert(verificationId);
      this.verifyOtp(verificationId);
    })
  }

  async verifyOtp(verificationId) {
    const prompt = await this.alertCtrl.create({
      cssClass: 'otp',
      header: 'OTP!',
      inputs: [
        {
          name: 'code',
          type: 'number',
          placeholder: 'Enter OTP'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (response) => {
            const smsCode = response.code;
            this.firebaseAuthentication.signInWithVerificationId(verificationId, smsCode).then(res => {
              console.log(res);
              this.firebaseAuthentication.onAuthStateChanged().subscribe(user => {
                if (user) {
                  this.result = user;
                  console.log(this.result);

                  this.firebaseAuthentication.getIdToken(false).then(token => {
                    this.user_token = token;
                    this.afs.doc(
                      `users/${this.result.uid}`
                    ).set({
                      uid: this.result.uid,
                      phone: this.result.phoneNumber,
                      token: this.user_token
                    });

                    // ionic push notification example
                    // this.fcm.onNotification().subscribe(data => {
                    //   console.log(data);

                    //   if (data.wasTapped) {
                    //     console.log('Received in background');
                    //   } else {
                    //     console.log('Received in foreground');
                    //   }
                    // });

                    this.storage.set('userToken', this.user_token);
                    this.router.navigate(['home']);
                  });
                }
              })
            }).catch(async (error) => {
              const alert = await this.alertCtrl.create({
                header: 'Please Try Again',
                message: 'do not match',
                buttons: ['OK'],
              });

              await alert.present();
            });
          }
        }
      ]
    })

    await prompt.present();
  }

}
