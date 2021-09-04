import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PopupModalShopPage } from '../popup-modal-shop/popup-modal-shop.page';

@Component({
  selector: 'app-popup-modal-login',
  templateUrl: './popup-modal-login.page.html',
  styleUrls: ['./popup-modal-login.page.scss'],
})
export class PopupModalLoginPage implements OnInit {

  constructor(
    private modalCtrl : ModalController
  ) { }

  ngOnInit() {
  }

  async checkShowModal(){
    const presentModel = await this.modalCtrl.create({
      component: PopupModalShopPage,
      showBackdrop: true,
      mode: "ios",
      cssClass: 'shop-modal'
    });

    return await presentModel.present();
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

}
