import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvaluationScorePage } from './evaluation-score.page';

const routes: Routes = [
  {
    path: '',
    component: EvaluationScorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvaluationScorePageRoutingModule {}
