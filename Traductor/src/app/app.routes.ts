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
  // Desafios
  {
    path: 'desafio-one',
    loadComponent: () => import('./components/desafios/desafio-one/desafio-one.page').then(m => m.DesafioOnePage)
  },
  {
    path: 'desafio-two',
    loadComponent: () => import('./components/desafios/desafio-two/desafio-two.page').then(m => m.DesafioTwoPage)
  },
  {
    path: 'desafio-three',
    loadComponent: () => import('./components/desafios/desafio-three/desafio-three.page').then(m => m.DesafioThreePage)
  },
  {
    path: 'desafio-four',
    loadComponent: () => import('./components/desafios/desafio-four/desafio-four.page').then(m => m.DesafioFourPage)
  },
  {
    path: 'desafio-five',
    loadComponent: () => import('./components/desafios/desafio-five/desafio-five.page').then(m => m.DesafioFivePage)
  },
  // Admin Login
  {
    path: 'admin/login',
    loadComponent: () => import('./admin/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'admin/recuperar-password',
    loadComponent: () => import('./admin/recuperar-password/recuperar-password.page').then(m => m.RecuperarPasswordPage)
  },
  // Rutas Admin
  {
    path: 'dashboard',
    loadComponent: () => import('./admin/dashboard/dashboard.page').then(m => m.DashboardPage)
  },
  {
    path: 'admin/user/profile',
    loadComponent: () => import('./admin/profile/profile.page').then(m => m.ProfilePage)
  },
  // Rutas Administradores
  {
    path: 'admins',
    loadComponent: () => import('./admin/admin/admin.page').then(m => m.AdminPage)
  },
  {
    path: 'admin/nuevo',
    loadComponent: () => import('./admin/admin-new-edit/admin-new-edit.page').then(m => m.AdminNewEditPage)
  },
  {
    path: 'admin/:id',
    loadComponent: () => import('./admin/admin-new-edit/admin-new-edit.page').then(m => m.AdminNewEditPage)
  },
  // Rutas de usuarios
  {
    path: 'admin/user/lista',
    loadComponent: () => import('./admin/users-list/users-list.page').then(m => m.UsersListPage)
  },
  {
    path: 'admin/user/nuevo',
    loadComponent: () => import('./admin/users-new-edit/users-new-edit.page').then(m => m.UsersNewEditPage)
  },
  {
    path: 'admin/user/:id',
    loadComponent: () => import('./admin/users-new-edit/users-new-edit.page').then(m => m.UsersNewEditPage)
  }
];
