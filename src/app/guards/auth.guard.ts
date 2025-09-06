import { CanActivateFn } from '@angular/router';
import { environment } from '../../environments/environment';

export const authGuard: CanActivateFn = async () => {
  const apiUrl = environment.apiUrl;
  try {
    const response = await fetch(`${apiUrl}/api/auth/me`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (response.ok){
      const user = await response.json();
      return user;
    }
  } catch {
    console.log('authorization error')
    return false;
  }
};
