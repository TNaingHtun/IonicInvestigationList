import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopupModalShopPageRoutingModule } from './popup-modal-shop-routing.module';

import { PopupModalShopPage } from './popup-modal-shop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopupModalShopPageRoutingModule
  ],
  declarations: [PopupModalShopPage]
})
export class PopupModalShopPageModule {}
