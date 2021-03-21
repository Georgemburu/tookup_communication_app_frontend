import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthPageComponent } from './auth-page/auth-page.component';
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';
import { AccountVerifyComponent } from './auth/account-verify/account-verify.component';

import { MessengerPageComponent } from './messenger-page/messenger-page.component';

const routes:Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthPageComponent },
  { path: 'messenger', component: MessengerPageComponent },
  { path: 'resetUserPassword/:token', component: PasswordResetComponent },
  { path: 'accountVerify', component: AccountVerifyComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
