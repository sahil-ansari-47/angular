import { Injectable, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { inject } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class Shortcutopen {
  private platformId = inject(PLATFORM_ID);
  private readonly _isOpen = signal(false);
  readonly isOpen = this._isOpen.asReadonly();

  constructor() {
    if(!isPlatformBrowser(this.platformId)) return;
    if (typeof window !== 'undefined' && window.innerWidth > 640) {
      this._isOpen.set(true);
    }
  }
  open() {
    this._isOpen.set(true);
  }
  close() {
    this._isOpen.set(false);
  }
  toggle() {
    this._isOpen.update(v => !v);
  }
}
