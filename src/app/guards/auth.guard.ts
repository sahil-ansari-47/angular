import { CanActivateFn } from '@angular/router';
import { environment } from '../../environments/environment';
import { error } from 'console';

export const authGuard: CanActivateFn = async () => {
  const apiUrl = environment.apiUrl;
  try {
    const response = await fetch(`${apiUrl}/api/auth/me`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    if (!response.ok) return false;

    const user = await response.json();
    return user && !user.error;
  } catch {
    console.log('authorization error')
    return false;
  }
};
