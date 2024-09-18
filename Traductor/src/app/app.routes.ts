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
    loadComponent: () => import('./components/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./components/signup/signup.page').then(m => m.SignupPage)
  },
  {
    path: 'recuperar-password',
    loadComponent: () => import('./components/recuperar-password/recuperar-password.page').then(m => m.RecuperarPasswordPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./components/profile/profile.page').then(m => m.ProfilePage)
  },
  {
    path: 'traductor',
    loadComponent: () => import('./components/traductor/traductor.page').then(m => m.TraductorPage)
  },
  {
    path: 'lecciones',
    loadComponent: () => import('./components/lecciones/lecciones.page').then(m => m.LeccionesPage)
  },

  // Admin Routes
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin/admin.page').then(m => m.AdminPage)
  },
  {
    path: 'admin/users',
    loadComponent: () => import('./admin/users-list/users-list.page').then(m => m.UsersListPage)
  },
  {
    path: 'admin/profile',
    loadComponent: () => import('./admin/profile/profile.page').then(m => m.ProfilePage)
  },
  {
    path: 'admin/login',
    loadComponent: () => import('./admin/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'admin/recuperar-password',
    loadComponent: () => import('./admin/recuperar-password/recuperar-password.page').then(m => m.RecuperarPasswordPage)
  }
];
