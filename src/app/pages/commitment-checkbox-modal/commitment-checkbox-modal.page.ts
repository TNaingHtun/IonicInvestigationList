import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CommitmentCheckboxService } from 'src/app/services/commitment-checkbox.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-commitment-checkbox-modal',
  templateUrl: './commitment-checkbox-modal.page.html',
  styleUrls: ['./commitment-checkbox-modal.page.scss'],
})
export class CommitmentCheckboxModalPage implements OnInit {
  @ViewChild(IonSlides) slider: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    pagination: false,
  };
  currentPage = 1;
  total = null;
  progress: any;
  commitmentDataList = [];
  commitmentSheetId = 19;
  commitmentApiDataList = [];
  commonSkilDetail: any;
  isComplete = 0;
  mainGoal:any;
  skillData: any;
  skillDataList = [];

  constructor(
    private router: Router,
    private global: GlobalService,
    private storage: Storage,
    private commitmentCheckboxService: CommitmentCheckboxService,
    public loadingController: LoadingController,
    private modalCtrl : ModalController
  ) { }

  ngOnInit() {
    this.getCommitmentInfoJson();
  }

  //get commitment info from json
  getCommitmentInfoJson() {
    this.commitmentCheckboxService.getCommitmentJson().subscribe(data => {
      console.log(data);
      let response: any = data;
      this.commitmentApiDataList = response.data;
      console.log(this.commitmentApiDataList);
      this.commitmentApiDataList.forEach(element => {
        this.mainGoal = {
          "main_goal_name": element.main_goal,
          "action_plans":[{
            "main_goal_detail":"各自の今期に達成したい目標が入ります。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。"
          }]
        }
      });
      this.commitmentApiDataList.push(this.mainGoal);
      console.log(this.commitmentApiDataList);
      this.total = this.commitmentApiDataList.length;
    })
  }

  //get Json Data
  getJsonData() {
    this.global.getStaffCommitmentData().subscribe(response => {
      console.log('enter');
      console.log(response);
      const evaMasterData: any = response;
      console.log(evaMasterData);
      this.commitmentDataList = evaMasterData.data;
      this.total = this.commitmentDataList.length;
      console.log(this.commitmentDataList.length);
    });
  }

  slidePrev() {
    if (this.currentPage > 1) {
      this.slider.lockSwipes(false);
      this.currentPage--;
      this.slider.slidePrev();
      this.slider.lockSwipes(true);
    }
  }
  slideNext() {
    if (this.currentPage < this.total) {
      this.slider.lockSwipes(false);
      this.currentPage += 1;
      this.slider.slideNext().then(() => {
        this.slider.lockSwipes(true);
      });
    }

  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

}
