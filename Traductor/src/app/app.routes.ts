import { Routes } from '@angular/router';
import { authGuard } from './service/auth.guard';

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
    loadComponent: () => import('./components/profile/profile.page').then(m => m.ProfilePage),
    canActivate: [authGuard]
  },
  {
    path: 'traductor',
    loadComponent: () => import('./components/traductor/traductor.page').then(m => m.TraductorPage),
    canActivate: [authGuard]
  },
  {
    path: 'lecciones',
    loadComponent: () => import('./components/lecciones/lecciones.page').then(m => m.LeccionesPage),
    canActivate: [authGuard]
  },
  {
    path: 'aprender',
    loadComponent: () => import('./components/aprender/aprender.page').then(m => m.AprenderPage),
    canActivate: [authGuard]
  },
  {
    path: 'sonidos',
    loadComponent: () => import('./components/sonidos/sonidos.page').then(m => m.SonidosPage),
    canActivate: [authGuard]
  },
  // Desafios
  {
    path: 'desafio-one',
    loadComponent: () => import('./components/desafios/desafio-one/desafio-one.page').then(m => m.DesafioOnePage),
    canActivate: [authGuard]
  },
  {
    path: 'desafio-two',
    loadComponent: () => import('./components/desafios/desafio-two/desafio-two.page').then(m => m.DesafioTwoPage),
    canActivate: [authGuard]
  },
  {
    path: 'desafio-three',
    loadComponent: () => import('./components/desafios/desafio-three/desafio-three.page').then(m => m.DesafioThreePage),
    canActivate: [authGuard]
  },
  {
    path: 'desafio-four',
    loadComponent: () => import('./components/desafios/desafio-four/desafio-four.page').then(m => m.DesafioFourPage),
    canActivate: [authGuard]
  },
  {
    path: 'desafio-five',
    loadComponent: () => import('./components/desafios/desafio-five/desafio-five.page').then(m => m.DesafioFivePage),
    canActivate: [authGuard]
  },
  // Admin Login
  {
    path: 'admin/login',
    loadComponent: () => import('./admin/login/login.page').then(m => m.LoginPage),
    canActivate: [authGuard]
  },
  {
    path: 'admin/recuperar-password',
    loadComponent: () => import('./admin/recuperar-password/recuperar-password.page').then(m => m.RecuperarPasswordPage),
    canActivate: [authGuard]
  },
  // Rutas Admin
  {
    path: 'dashboard',
    loadComponent: () => import('./admin/dashboard/dashboard.page').then(m => m.DashboardPage),
    canActivate: [authGuard]
  },
  {
    path: 'admin/user/profile',
    loadComponent: () => import('./admin/profile/profile.page').then(m => m.ProfilePage),
    canActivate: [authGuard]
  },
  // Rutas Administradores
  {
    path: 'admins',
    loadComponent: () => import('./admin/admin/admin.page').then(m => m.AdminPage),
    canActivate: [authGuard]
  },
  {
    path: 'admin/nuevo',
    loadComponent: () => import('./admin/admin-new-edit/admin-new-edit.page').then(m => m.AdminNewEditPage),
    canActivate: [authGuard]
  },
  {
    path: 'admin/:id',
    loadComponent: () => import('./admin/admin-new-edit/admin-new-edit.page').then(m => m.AdminNewEditPage),
    canActivate: [authGuard]
  },
  // Rutas de usuarios
  {
    path: 'admin/user/lista',
    loadComponent: () => import('./admin/users-list/users-list.page').then(m => m.UsersListPage),
    canActivate: [authGuard]
  },
  {
    path: 'admin/user/nuevo',
    loadComponent: () => import('./admin/users-new-edit/users-new-edit.page').then(m => m.UsersNewEditPage),
    canActivate: [authGuard]
  },
  {
    path: 'admin/user/:id',
    loadComponent: () => import('./admin/users-new-edit/users-new-edit.page').then(m => m.UsersNewEditPage),
    canActivate: [authGuard]
  }
];
