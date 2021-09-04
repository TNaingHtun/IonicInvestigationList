import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopupModalTestPageRoutingModule } from './popup-modal-test-routing.module';

import { PopupModalTestPage } from './popup-modal-test.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopupModalTestPageRoutingModule
  ],
  declarations: [PopupModalTestPage]
})
export class PopupModalTestPageModule {}
