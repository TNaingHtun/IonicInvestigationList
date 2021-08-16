import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SemicircleProgressPage } from './semicircle-progress.page';

const routes: Routes = [
  {
    path: '',
    component: SemicircleProgressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SemicircleProgressPageRoutingModule {}
