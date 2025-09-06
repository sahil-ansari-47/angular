import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    // Server-side: allow dashboard to render
    return true;
  }

  const token = localStorage.getItem('token');
  if (!token) {
    router.navigate(['/']);
    return false;
  }

  return true; // fetch user in component instead
};
