import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { environment } from '../../environments/environment';

export const authGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const apiUrl = environment.apiUrl;

  try {
    const response = await fetch(`${apiUrl}/api/auth/me`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    if (!response.ok) {
      console.log('authGuard: unauthorized');
      router.navigate(['/']);
      return false;
    }

    const user = await response.json();

    if (user && !user.error) {
      console.log('authGuard user', user);
      return true;
    } else {
      console.log('authGuard no user');
      router.navigate(['/']);
      return false;
    }
  } catch (err) {
    console.error('authGuard error:', err);
    router.navigate(['/']);
    return false;
  }
};
