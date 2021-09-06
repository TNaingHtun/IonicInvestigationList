import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { GlobalService } from 'src/app/services/global.service';
import { finalize, isEmpty } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { Badge } from '@ionic-native/badge/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  profile_id = 1;
  profile: any;
  name: string = '';
  phone: string = '';
  email: string = '';
  address: string = '';
  image: string = '';
  token: string;

  connectedBarColor='connectedBarColorOne'
  registrationValueOne = 'selectIcon';
  registrationValueTwo = 'selectIcon';
  registrationValueThree = 'unselectIcon';

  constructor(
    private router: Router,
    private global: GlobalService,
    private storage: Storage,
    private profileService: ProfileService,
    private uniqueDeviceID: UniqueDeviceID,
    private badge: Badge
  ) { }
  ngOnInit() {
    this.storage.create();
    this.storage.set('profile id', this.profile_id);
    this.global.getFirebaseRefreshToken().then(token => {
      console.log(token);
      this.token = token;
      this.getProfile(this.profile_id, this.token);
    });

    this.uniqueDeviceID.get()
      .then((uuid: any) => {
        console.log('device id:', uuid);
      })
      .catch((error: any) => console.log(error));
  }

  ionViewWillEnter() {

  }

  getProfile(profile_id, token) {
    this.profileService.getProfileDetail(profile_id, token)
      .pipe(
        finalize(() => {

        }))
      .subscribe(
        data => {
          this.profile = data;
          console.log(this.profile);
          this.name = this.profile.name;
          this.phone = this.profile.phone;
          this.email = this.profile.email;
          this.address = this.profile.address;
          if (this.profile.image === null) {
            this.image = "assets/images/profile.png";
          } else {
            this.image = this.global.s3_url + this.profile.image;
            console.log(this.image);
          }
        }, (error: any) => {
          console.log(error);
        }
      )
  }

  goToProfile() {
    this.router.navigate(['profile']);
  }
  toProgressBar() {
    this.router.navigate(['evaluation-score']);
  }

  toCalendar() {
    this.router.navigate(['calendar']);
  }

  toImageStamp() {
    this.router.navigate(['image-stamp']);
  }

  toCommitmentCheck() {
    this.router.navigate(['commitment-checkbox']);
  }
  toSemiProgress() {
    this.router.navigate(['semicircle-progress']);
  }
  
}
