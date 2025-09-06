import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user';
import { environment } from '../../environments/environment';

export const authGuard = async () => {
  const router = inject(Router);
  const userService = inject(UserService);
  const apiUrl = environment.apiUrl;

  if (localStorage.getItem('user')) return true;
  // ✅ if we already have a user in memory, no need to block
  if (userService.user) {
    return true;
  }

  const token = localStorage.getItem('token');
  if (!token) {
    return router.createUrlTree(['/']); // or login
  }

  // otherwise fetch once from API
  try {
    const res = await fetch(`${apiUrl}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      localStorage.removeItem('token');
      return router.createUrlTree(['/']);
    }

    const user = await res.json();
    if (user && !user.error) {
      userService.setUser(user);
      return true;
    }
  } catch (err) {
    console.error(err);
  }

  return router.createUrlTree(['/']);
};
