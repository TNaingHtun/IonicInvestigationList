import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvaluationScorePageRoutingModule } from './evaluation-score-routing.module';

import { EvaluationScorePage } from './evaluation-score.page';
import { DateAgoPipe } from 'src/app/pipes/date-ago.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EvaluationScorePageRoutingModule
  ],
  declarations: [EvaluationScorePage,DateAgoPipe]
})
export class EvaluationScorePageModule {}
