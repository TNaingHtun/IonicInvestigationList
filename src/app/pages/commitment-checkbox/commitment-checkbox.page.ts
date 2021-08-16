import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import {  ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CommitmentCheckboxModalPage } from '../commitment-checkbox-modal/commitment-checkbox-modal.page';

@Component({
  selector: 'app-commitment-checkbox',
  templateUrl: './commitment-checkbox.page.html',
  styleUrls: ['./commitment-checkbox.page.scss'],
})
export class CommitmentCheckboxPage implements OnInit {
  commitmentDataList = [];
  constructor(
    private router: Router,
    private global: GlobalService,
    private storage: Storage,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.getJsonData();
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
        main_goal_name : "ASDFGHJKL"
      }
      this.commitmentDataList.splice(4,0,mainGoal);
      console.log(this.commitmentDataList);
      console.log(this.commitmentDataList.length);
    });
  }
  async checkShowModal(){
    const presentModel = await this.modalCtrl.create({
      component: CommitmentCheckboxModalPage,
      componentProps: {
        title: 'Billing Address',
        type:'billing',
      },
      showBackdrop: true,
      mode: "ios",
      cssClass: 'commitment-modal'
    });

    return await presentModel.present();
  }

}
