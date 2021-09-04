import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopupModalLoginPage } from './popup-modal-login.page';

const routes: Routes = [
  {
    path: '',
    component: PopupModalLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopupModalLoginPageRoutingModule {}
