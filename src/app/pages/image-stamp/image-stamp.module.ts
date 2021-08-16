import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImageStampPageRoutingModule } from './image-stamp-routing.module';

import { ImageStampPage } from './image-stamp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageStampPageRoutingModule
  ],
  declarations: [ImageStampPage]
})
export class ImageStampPageModule {}
