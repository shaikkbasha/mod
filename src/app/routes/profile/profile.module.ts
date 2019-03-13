import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../shared/okta/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';

export function onAuthRequired({oktaAuth, router}) {
  // Redirect the user to your custom login page
  router.navigate(['/login']);
}

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {
      onAuthRequired
    }
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfileComponent],
  exports: [
    RouterModule
  ]
})
export class ProfileModule {
}
