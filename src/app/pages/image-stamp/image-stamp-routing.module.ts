import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageStampPage } from './image-stamp.page';

const routes: Routes = [
  {
    path: '',
    component: ImageStampPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageStampPageRoutingModule {}
