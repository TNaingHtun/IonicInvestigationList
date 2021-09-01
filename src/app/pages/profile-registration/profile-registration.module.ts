import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileRegistrationPageRoutingModule } from './profile-registration-routing.module';

import { ProfileRegistrationPage } from './profile-registration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileRegistrationPageRoutingModule
  ],
  declarations: [ProfileRegistrationPage]
})
export class ProfileRegistrationPageModule {}
