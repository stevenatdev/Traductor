import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsersService } from './users.service';

export const authGuard: CanActivateFn = (route, state) => {
  const adminService = inject(UsersService);
  const router = inject(Router);

  // Convertimos la promesa de `getSession` en un Observable usando `from`
  return from(adminService.getSession('id')).pipe(
    map((session) => {
      if (session) {
        // Si hay sesión, permitir el acceso
        return true;
      } else {
        // Si no hay sesión, redirigir al login
        router.navigate(['/home']);
        return false;
      }
    })
  );
};
