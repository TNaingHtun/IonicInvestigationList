import { Component, OnInit } from '@angular/core';
import {  ModalController } from '@ionic/angular';
import { PopupModalLoginPage } from '../popup-modal-login/popup-modal-login.page';

@Component({
  selector: 'app-popup-modal-test',
  templateUrl: './popup-modal-test.page.html',
  styleUrls: ['./popup-modal-test.page.scss'],
})
export class PopupModalTestPage implements OnInit {

  constructor(
    private modalCtrl : ModalController
  ) { }

  ngOnInit() {
  }
  async checkShowModal(){
    const presentModel = await this.modalCtrl.create({
      component: PopupModalLoginPage,
      showBackdrop: true,
      mode: "ios",
      cssClass: 'login-modal'
    });

    return await presentModel.present();
  }
  

}
