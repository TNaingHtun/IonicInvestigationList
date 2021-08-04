import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProfileEditPageRoutingModule } from './profile-edit-routing.module';

import { ProfileEditPage } from './profile-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProfileEditPageRoutingModule
  ],
  declarations: [ProfileEditPage]
})
export class ProfileEditPageModule {}
