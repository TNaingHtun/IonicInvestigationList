import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommitmentCheckboxModalPageRoutingModule } from './commitment-checkbox-modal-routing.module';

import { CommitmentCheckboxModalPage } from './commitment-checkbox-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommitmentCheckboxModalPageRoutingModule
  ],
  declarations: [CommitmentCheckboxModalPage]
})
export class CommitmentCheckboxModalPageModule {}
