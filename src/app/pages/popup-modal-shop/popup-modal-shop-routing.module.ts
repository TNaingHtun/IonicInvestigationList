import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopupModalShopPage } from './popup-modal-shop.page';

const routes: Routes = [
  {
    path: '',
    component: PopupModalShopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopupModalShopPageRoutingModule {}
