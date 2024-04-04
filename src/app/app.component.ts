import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Title } from '@angular/platform-browser';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { SLIDE_IN_OUT } from './shared/animations/slid-in-out';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatTooltipModule,
    MatBadgeModule,
  ],
  animations: [SLIDE_IN_OUT],
})
export class AppComponent {
  pageService = inject(Title);
  router = inject(Router);
  sideNav: boolean = false;
  isMode: boolean = JSON.parse(localStorage.getItem('dark-mode') ?? 'false');

  menuItems = [
    {
      pageName: 'Transações',
      route: 'transaction',
      icon: 'monetization_on',
      toolTip: 'Transações',
    },
  ];
  get pageTitle() {
    return this.pageService.getTitle();
  }
  get isAuthPage() {
    return this.router.url === '/auth';
  }
}
