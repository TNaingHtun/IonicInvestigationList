import { Component,ElementRef,ViewChild, OnInit } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-stamp-modal',
  templateUrl: './image-stamp-modal.page.html',
  styleUrls: ['./image-stamp-modal.page.scss'],
})
export class ImageStampModalPage implements OnInit {
  displayStamp: any;

  //Configuration for each Slider
  slideOption = {
    initialSlide: 0,
    slidesPerView: 4,
    speed:400,
    loop:false,
    pager:false
  };
  
  constructor(private modalController:ModalController) { }

  ngOnInit() {
    this.slideOption;
  }
  stampImage(image){
    this.displayStamp = image;
    this.modalController.dismiss(image);
    
  }

}
