import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./components/signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: 'recuperar-password',
    loadComponent: () => import('./components/recuperar-password/recuperar-password.page').then( m => m.RecuperarPasswordPage)
  },
  {
    path: 'traductor',
    loadComponent: () => import('./components/traductor/traductor.page').then( m => m.TraductorPage)
  },
];
