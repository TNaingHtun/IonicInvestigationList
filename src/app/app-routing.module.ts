import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'commitment-checkbox',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'profile-edit',
    loadChildren: () => import('./pages/profile-edit/profile-edit.module').then( m => m.ProfileEditPageModule)
  },
  {
    path: 'evaluation-score',
    loadChildren: () => import('./pages/evaluation-score/evaluation-score.module').then( m => m.EvaluationScorePageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./pages/calendar/calendar.module').then( m => m.CalendarPageModule)
  },
  {
    path: 'image-stamp',
    loadChildren: () => import('./pages/image-stamp/image-stamp.module').then( m => m.ImageStampPageModule)
  },
  {
    path: 'image-stamp-modal',
    loadChildren: () => import('./pages/image-stamp-modal/image-stamp-modal.module').then( m => m.ImageStampModalPageModule)
  },
  {
    path: 'commitment-checkbox-modal',
    loadChildren: () => import('./pages/commitment-checkbox-modal/commitment-checkbox-modal.module').then( m => m.CommitmentCheckboxModalPageModule)
  },
  {
    path: 'commitment-checkbox',
    loadChildren: () => import('./pages/commitment-checkbox/commitment-checkbox.module').then( m => m.CommitmentCheckboxPageModule)
  },
  {
    path: 'semicircle-progress',
    loadChildren: () => import('./pages/semicircle-progress/semicircle-progress.module').then( m => m.SemicircleProgressPageModule)
  },
  {
    path: 'phone-auth',
    loadChildren: () => import('./pages/phone-auth/phone-auth.module').then( m => m.PhoneAuthPageModule)
  },
  {
    path: 'profile-registration',
    loadChildren: () => import('./pages/profile-registration/profile-registration.module').then( m => m.ProfileRegistrationPageModule)
  },
  {
    path: 'popup-modal-test',
    loadChildren: () => import('./pages/popup-modal-test/popup-modal-test.module').then( m => m.PopupModalTestPageModule)
  },
  {
    path: 'popup-modal-login',
    loadChildren: () => import('./pages/popup-modal-login/popup-modal-login.module').then( m => m.PopupModalLoginPageModule)
  },
  {
    path: 'popup-modal-shop',
    loadChildren: () => import('./pages/popup-modal-shop/popup-modal-shop.module').then( m => m.PopupModalShopPageModule)
  },
  {
    path: 'shop-list-modal',
    loadChildren: () => import('./pages/shop-list-modal/shop-list-modal.module').then( m => m.ShopListModalPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
