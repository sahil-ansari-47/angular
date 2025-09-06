// auth-callback.ts
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  templateUrl: './auth-callback.html',
})
export class AuthCallback implements OnInit {
  private router = inject(Router);

  ngOnInit() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token);
    }

    this.router.navigate(['/dashboard']);
  }
}
