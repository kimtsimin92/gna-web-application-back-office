import { Routes } from '@angular/router';
import {LoginComponent} from "./auth/pages/login/login.component";
import {PasswordForgotComponent} from "./auth/pages/password-forgot/password-forgot.component";
import {LoginFirstTimeComponent} from "./auth/pages/login-first-time/login-first-time.component";
import {authGuard} from "./auth/auth.guard";

export const routes: Routes = [
  {
    path: 'login',
    title: 'GNA - Connexion',
    component: LoginComponent
  },
  {
    path: 'login/first-time',
    title: 'Changement de mot de passe | Première connexion | GNA',
    canActivate: [authGuard],
    component: LoginFirstTimeComponent
  },
  {
    path: 'login/password/forgot',
    title: 'Mot de passe oublié | Connexion impossible | GNA',
    component: PasswordForgotComponent
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.routes').then(r => r.routes)
  },
  {
    path: '',
    redirectTo: '/account/home',
    pathMatch: 'full'
  },
];
