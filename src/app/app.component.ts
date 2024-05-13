import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Title } from '@angular/platform-browser';
import { Router, RouterOutlet } from '@angular/router';
import { CartProductService } from './domain/products/service/cart-product/cart-product.service';
import { SLIDE_IN_OUT } from './shared/animations/slid-in-out';
import { StorageService } from './shared/services/storage/storage.service';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatSidenavModule,
    SharedModule,
  ],
  animations: [SLIDE_IN_OUT],
})
export class AppComponent {
  pageService = inject(Title);
  router = inject(Router);
  productCartService = inject(CartProductService);
  storageService = inject(StorageService);

  numberProductsOfCart = this.productCartService.numberOfCart();
  sideNav = false;
  isMode: boolean = JSON.parse(
    this.storageService.getItem('dark-mode') ?? 'false'
  );
  condition = true;
  menuItems = [
    {
      pageName: 'Produtos',
      route: 'products',
      icon: 'monetization_on',
      toolTip: 'Produtos',
    },
    {
      pageName: 'Conta',
      route: 'account',
      icon: 'account_circle',
      toolTip: 'Conta',
    },
  ];
  get pageTitle() {
    return this.pageService.getTitle();
  }
  get isAuthPage() {
    return this.router.url === '/auth';
  }
  get isAccountPage() {
    return this.router.url === '/account';
  }
  get user() {
    return JSON.parse(this.storageService.getItem('user') ?? '{}');
  }
}
