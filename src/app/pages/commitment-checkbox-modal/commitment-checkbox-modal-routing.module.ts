import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommitmentCheckboxModalPage } from './commitment-checkbox-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CommitmentCheckboxModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommitmentCheckboxModalPageRoutingModule {}
