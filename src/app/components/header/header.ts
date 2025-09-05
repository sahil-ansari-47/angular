import { Component, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { UserService } from '../../services/user';
import { DialogService } from '../../services/dialog';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
})
export class Header {
  private dialog = inject(DialogService);
  private platformId = inject(PLATFORM_ID);
  private apiUrl = environment.apiUrl;

  constructor(public userService: UserService) {
    // Only fetch user if NOT server-side
    if (isPlatformBrowser(this.platformId)) {
      this.fetchCurrentUser();
    }
  }

  fetchCurrentUser() {
    fetch(`${this.apiUrl}/api/auth/me`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((res) => {
        if (!res.ok) return null; // don’t parse if unauthorized
        return res.json();
      })
      .then((user) => {
        console.log(user);
        if (user && !user.error) {
          this.userService.setUser(user);
        } else {
          this.userService.clearUser();
        }
      })
      .catch(() => this.userService.clearUser());
  }
  openLogin() {
    this.dialog.openDialog();
  }
  logout() {
  const token = localStorage.getItem('token');
  fetch(`${this.apiUrl}/api/logout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(() => {
    this.userService.clearUser();
    localStorage.removeItem('token');
    window.location.reload();
  });
}
}
