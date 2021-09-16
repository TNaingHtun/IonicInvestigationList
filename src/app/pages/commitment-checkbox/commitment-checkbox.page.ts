import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CommitmentCheckboxModalPage } from '../commitment-checkbox-modal/commitment-checkbox-modal.page';
import { CommitmentCheckboxService } from 'src/app/services/commitment-checkbox.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-commitment-checkbox',
  templateUrl: './commitment-checkbox.page.html',
  styleUrls: ['./commitment-checkbox.page.scss'],
})
export class CommitmentCheckboxPage implements OnInit {
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
    private modalCtrl: ModalController,
    private commitmentCheckboxService: CommitmentCheckboxService,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.getCommitmentInfoJson();
    // this.getCommitmentApiData();
    this.getJsonData();
  }

  //loading
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      duration: 4000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  //get commitment info from json
  getCommitmentInfoJson() {
    this.commitmentCheckboxService.getCommitmentJson().subscribe(data => {
      console.log(data);
      let response: any = data;
      this.commitmentApiDataList = response.data;
      console.log(this.commitmentApiDataList);
      this.commitmentApiDataList.forEach(element => {
        this.skillData = {
          "skill_name": element.skill_name,
          "skill_details_name": element.skill_details_name
        };
        this.mainGoal = {
          "main_goal": element.main_goal
        }
        this.skillDataList.push(this.skillData);
        console.log(this.skillData);
      });
      this.skillDataList.splice(4, 0, this.mainGoal);
      console.log(this.skillDataList);
    })
  }
  //get api commitment data
  getCommitmentApiData() {
    this.commitmentCheckboxService.getCommitmentInfo(this.commitmentSheetId)
      .subscribe(data => {
        console.log(data);
        let response: any = data;
        this.commitmentApiDataList = response.data;
        console.log(this.commitmentApiDataList);

      });
  }

  //get Json Data
  getJsonData() {
    this.global.getStaffCommitmentData().subscribe(response => {
      console.log('enter');
      console.log(response);
      const evaMasterData: any = response;
      console.log(evaMasterData);
      this.commitmentDataList = evaMasterData.data;
      let mainGoal = {
        main_goal_name: "ASDFGHJKL",
        skill_details_name: "asaefdsagdfdhdfhvdfvdfbbd"
      }
      this.commitmentDataList.splice(4, 0, mainGoal);
      console.log(this.commitmentDataList);
      console.log(this.commitmentDataList.length);
    });
  }
  async checkShowModal() {
    const presentModel = await this.modalCtrl.create({
      component: CommitmentCheckboxModalPage,
      componentProps: {
        title: 'Billing Address',
        type: 'billing',
      },
      showBackdrop: true,
      mode: "ios",
      cssClass: 'commitment-modal'
    });

    return await presentModel.present();
  }
  commitmentUnCheck(actionPlanId) {
    console.log(actionPlanId);
    let updateActionPlanData = {
      selected_action_plan_id: actionPlanId,
      is_complete: 1
    };
    this.commitmentCheckboxService.updateCommitmentCheck(updateActionPlanData).subscribe(data => {
      console.log(data);
      this.presentLoading();
      this.getCommitmentInfoJson();
    })
  }

  commitmentCheck(actionPlanId) {
    console.log(actionPlanId);
    let updateActionPlanData = {
      selected_action_plan_id: actionPlanId,
      is_complete: 0
    };
    this.commitmentCheckboxService.updateCommitmentCheck(updateActionPlanData).subscribe(data => {
      console.log(data);
      this.presentLoading();
      this.getCommitmentInfoJson();
    })
  }

}
