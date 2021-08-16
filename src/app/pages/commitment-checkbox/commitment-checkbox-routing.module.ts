import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommitmentCheckboxPage } from './commitment-checkbox.page';

const routes: Routes = [
  {
    path: '',
    component: CommitmentCheckboxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommitmentCheckboxPageRoutingModule {}
