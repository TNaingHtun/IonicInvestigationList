import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { GlobalService } from 'src/app/services/global.service';
import { finalize, isEmpty } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  profile_id = 3;
  profile: any;
  name: string = '';
  phone: string = '';
  email: string = '';
  address: string = '';
  image: string = '';

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private global : GlobalService,
    private storage: Storage,
    ) {}
    ngOnInit() {
      this.storage.create();
    }

    ionViewWillEnter() {
      this.storage.set('profile id',this.profile_id);
      this.getProfile(this.profile_id)
    }

    getProfile(profile_id) {
      this.profileService.getProfileDetail(profile_id)
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
            if(this.profile.image === null){
              this.image = "assets/images/profile.png";
            }else{
              this.image = this.global.s3_url + this.profile.image;
              console.log(this.image);
            }
          }, (error: any) => {
            console.log(error);
          }
        )
    }

  goToProfile(){
    this.router.navigate(['profile']);
  }
  toProgressBar(){
    this.router.navigate(['evaluation-score']);
  }
  
  toCalendar(){
    this.router.navigate(['calendar']);
  }

  toImageStamp(){
    this.router.navigate(['image-stamp']);
  }

  toCommitmentCheck(){
    this.router.navigate(['commitment-checkbox']);
  }
}
