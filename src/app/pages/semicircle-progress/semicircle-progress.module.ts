import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SemicircleProgressPageRoutingModule } from './semicircle-progress-routing.module';

import { SemicircleProgressPage } from './semicircle-progress.page';
import {RoundProgressModule} from 'angular-svg-round-progressbar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SemicircleProgressPageRoutingModule,
    RoundProgressModule
  ],
  declarations: [SemicircleProgressPage]
})
export class SemicircleProgressPageModule {}
