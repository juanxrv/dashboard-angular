import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user';

export const isNotLogged: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate(["login"]);
    return false
  }

  authService.user().subscribe({
    next: (data: User) => {
      authService.userData = data
    },

    error: (error: any) => {
      console.log(error)
    }
  })

  return true;
};

export const loggedGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService)
  const router = inject(Router)

  if (authService.isAuthenticated()) {
    router.navigate([""]);
    return false
  }
  
  return true;
};
