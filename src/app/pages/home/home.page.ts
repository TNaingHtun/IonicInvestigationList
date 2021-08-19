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
  profile_id = 1;
  profile: any;
  name: string = '';
  phone: string = '';
  email: string = '';
  address: string = '';
  image: string = '';
  token:string;

  constructor(
    private router: Router,
    private global : GlobalService,
    private storage: Storage,
    private profileService: ProfileService,
    ) {}
    ngOnInit() {
      this.storage.create();
      this.storage.set('profile id',this.profile_id);
      this.global.getFirebaseRefreshToken().then(token=>{
        console.log(token);
        this.token = token;
        this.getProfile(this.profile_id,this.token);
      });
    }

    ionViewWillEnter() {
      
    }

    getProfile(profile_id,token) {
      this.profileService.getProfileDetail(profile_id,token)
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
  toSemiProgress(){
    this.router.navigate(['semicircle-progress']);
  }
}
