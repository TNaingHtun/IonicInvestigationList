import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-phone-auth',
  templateUrl: './phone-auth.page.html',
  styleUrls: ['./phone-auth.page.scss'],
})
export class PhoneAuthPage implements OnInit {
  number: string;
  result: any;
  user_token: any;

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private firebaseAuthentication: FirebaseAuthentication,
    public toastCtrl: ToastController,
    private afs: AngularFirestore,
    private storage:Storage
  ) { }

  ngOnInit() {
    this.storage.create();
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
