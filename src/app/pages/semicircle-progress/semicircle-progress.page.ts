import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-semicircle-progress',
  templateUrl: './semicircle-progress.page.html',
  styleUrls: ['./semicircle-progress.page.scss'],
})
export class SemicircleProgressPage implements OnInit {
  max = 50;
  current=25;
  color="rgba(69, 168, 252,0.5)";
  background="#eaeaea";
  progress = this.current / this.max;
  percent = Math.round(this.progress * 100);
  data;
  profile_id:any;

  constructor(
    private profileService: ProfileService,
    private storage: Storage,
    private global:GlobalService
    ) { }

  ngOnInit() {
    this.storage.get('profile id').then((profile_id) => {
      this.profile_id = profile_id;
      this.getAllProfile()
    })
    
  }

  getAllProfile(){
    this.global.getFirebaseRefreshToken().then(token=>{
      console.log(token);
      this.data = this.profileService.getProfileList(token).subscribe(data=>{
        console.log(data);
      })
    });
    
    
  }

}
