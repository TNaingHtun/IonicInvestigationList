import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopupModalLoginPageRoutingModule } from './popup-modal-login-routing.module';

import { PopupModalLoginPage } from './popup-modal-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopupModalLoginPageRoutingModule
  ],
  declarations: [PopupModalLoginPage]
})
export class PopupModalLoginPageModule {}
