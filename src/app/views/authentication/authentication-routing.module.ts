import { AuthResetPasswordComponent } from './auth-reset-password/auth-reset-password.component';
import { AuthChangePasswordComponent } from './auth-change-password/auth-change-password.component';
import { AuthSigninComponent } from './auth-signin/auth-signin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'signin',
        component: AuthSigninComponent
      },
      {
        path: 'change-password',
        component: AuthChangePasswordComponent
      },
      {
        path: 'reset-password',
        component: AuthResetPasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
