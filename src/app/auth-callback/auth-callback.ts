// auth-callback.ts
import { Component, inject, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  templateUrl: './auth-callback.html',
})
export class AuthCallback implements OnInit {
  private router = inject(Router);
  @Input() text: string = 'Loading Dashboard';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.renderer.setStyle(
      this.el.nativeElement.querySelector('.text-loader'),
      '--loader-text',
      `"${this.text}"` // CSS custom property expects quotes
    );
  }
  ngOnInit() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token);
    }

    this.router.navigate(['/dashboard']);
  }
}
