import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminService } from './admin.service';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const adminService = inject(AdminService);
  const router = inject(Router);

  // Convertimos la promesa de `getSession` en un Observable usando `from`
  return from(adminService.getSession('userSession')).pipe(
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
