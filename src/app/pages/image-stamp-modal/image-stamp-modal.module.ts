import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImageStampModalPageRoutingModule } from './image-stamp-modal-routing.module';

import { ImageStampModalPage } from './image-stamp-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageStampModalPageRoutingModule
  ],
  declarations: [ImageStampModalPage]
})
export class ImageStampModalPageModule {}
