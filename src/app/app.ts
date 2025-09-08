import { Component,inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet, } from '@angular/router';
import { Header } from './components/header/header';
import { InteractiveBubbleDirective } from './directives/bubble';
import { Router } from '@angular/router';
import { Footer } from './components/footer/footer';
import { MobileNav } from "./components/mobile-nav/mobile-nav";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, InteractiveBubbleDirective, Footer, MobileNav],
  templateUrl: './app.html',
  standalone: true,
})
export class App {
  private platformId = inject(PLATFORM_ID)
  constructor(public router: Router) {
    if(!isPlatformBrowser(this.platformId))
      return;
  }
  get isHome(): boolean {
    return this.router.url === '/' || this.router.url.startsWith('/#');
  }
  get isHomeorDocs(): boolean {
    return this.router.url === '/' || this.router.url.startsWith('/docs') || this.router.url.startsWith('/#');
  }
}
