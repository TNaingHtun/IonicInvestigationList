import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommitmentCheckboxPageRoutingModule } from './commitment-checkbox-routing.module';

import { CommitmentCheckboxPage } from './commitment-checkbox.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommitmentCheckboxPageRoutingModule
  ],
  declarations: [CommitmentCheckboxPage]
})
export class CommitmentCheckboxPageModule {}
