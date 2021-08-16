import { Component, OnInit } from '@angular/core';
import {  ModalController } from '@ionic/angular';
import { ImageStampModalPage } from '../image-stamp-modal/image-stamp-modal.page';

@Component({
  selector: 'app-image-stamp',
  templateUrl: './image-stamp.page.html',
  styleUrls: ['./image-stamp.page.scss'],
})
export class ImageStampPage implements OnInit {
  displayStamp;
  showStampPhoto = false;
  constructor( private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async showStamp(){
    const presentModel = await this.modalCtrl.create({
      component: ImageStampModalPage,
      componentProps: {
        title: 'Billing Address',
        type:'billing',
      },
      showBackdrop: true,
      mode: "ios",
      cssClass: 'stamp-modal'
    });

    presentModel.onWillDismiss().then((data)=>{
      console.log(data);
      this.displayStamp = data.data;
      if(this.displayStamp !== undefined){
        this.showStampPhoto = true;
      }else{
        console.log(this.displayStamp);
        this.showStampPhoto = false;
      }
      //custom code
    });

    return await presentModel.present();
  }

}
