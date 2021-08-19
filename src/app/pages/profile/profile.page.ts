import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profile_id:any;
  profile: any;
  name: string = '';
  phone: string = '';
  email: string = '';
  address: string = '';
  image: string = '';
  isLoading = false;
  token:string;

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private global : GlobalService,
    private loadingCtrl: LoadingController,
    private storage: Storage,
    ) { }

  ngOnInit() {
    this.storage.create();
    this.global.getFirebaseRefreshToken().then(token=>{
      console.log(token);
      this.token = token;
      this.storage.get('profile id').then((profile_id) => {
        this.profile_id = profile_id;
        this.getProfileDetail(this.profile_id,this.token)
      })
    });
  }

  ionViewWillEnter() {
  }

  getProfileDetail(profile_id,token) {
    this.present('Loading... ');
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
  profileEdit(){
    this.router.navigate(['profile-edit']);
  }

  async present(s) {
    this.isLoading = true;
    const loading = await this.loadingCtrl.create({
      message: s
    })
    loading.present().then(() => {
      setTimeout(() => {
        if (this.isLoading) {
          this.dismiss()
        }
      }, 5000);
    });
  }
  async dismiss() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss();
  }

  back(){
    this.router.navigate(['home']);
  }

}
