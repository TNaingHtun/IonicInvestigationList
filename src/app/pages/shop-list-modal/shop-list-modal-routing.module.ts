import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopListModalPage } from './shop-list-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ShopListModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopListModalPageRoutingModule {}
