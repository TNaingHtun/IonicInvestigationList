import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';

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

  constructor(
    private router: Router,
    private global: GlobalService,
    private storage: Storage,
    private modalCtrl : ModalController
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
