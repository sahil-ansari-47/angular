import { Component, inject, PLATFORM_ID, effect } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Shortcutopen } from '../services/shortcutopen';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-docs',
  imports: [RouterModule, CommonModule],
  templateUrl: './docs.html',
  styles: `
  a{
    text-decoration: underline;
    text-underline-offset: 2px;
    color: #67d4e9;
  }
  `,
})
export class Docs {
  private platformId = inject(PLATFORM_ID);
  public shortcutopen = inject(Shortcutopen);
  constructor() {
    if(!isPlatformBrowser(this.platformId)) return;
    effect(() => {
      if (!isPlatformBrowser(this.platformId)) return;

      if (this.shortcutopen.isOpen() && window.innerWidth < 640) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
    });
  }
  openIndex: number | null = 0;
  sections = [
    {
      title: 'Introduction',
      links: [
        { label: 'Features', fragment: 'features' },
        { label: 'Getting Started', fragment: 'getting-started' },
        { label: 'Deployment', fragment: 'deployment' },
      ],
    },
    {
      title: 'Architecture',
      links: [
        { label: 'Overview', fragment: 'overview' },
        { label: 'Repositories', fragment: 'repositories' },
      ],
    },
    {
      title: 'Run Jett',
      links: [
        { label: 'Your Local Setup', fragment: 'local' },
        { label: 'Redis & WSL', fragment: 'redis-wsl' },
      ],
    },
    {
      title: 'Contributions',
      links: [{ label: 'How to Contribute', fragment: 'contribute' }],
    },
  ];

  toggle() {
    if(window.innerWidth < 640) this.shortcutopen.toggle();
  }
  toggleSection(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
  }
}
