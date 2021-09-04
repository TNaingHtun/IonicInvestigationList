import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopListModalPageRoutingModule } from './shop-list-modal-routing.module';

import { ShopListModalPage } from './shop-list-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopListModalPageRoutingModule
  ],
  declarations: [ShopListModalPage]
})
export class ShopListModalPageModule {}
