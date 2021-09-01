import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileRegistrationPage } from './profile-registration.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRegistrationPageRoutingModule {}
