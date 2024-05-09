import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: 'auth',
    loadChildren: async () =>
      (await import('./domain/auth/auth-routing.module')).AuthRoutingModule,
  },
  {
    title: 'Produtos',
    path: 'products',
    loadChildren: async () =>
      (await import('./domain/products/products.module')).ProductsRoutingModule,
  },
  {
    path: 'products-details/:id',
    loadComponent: async () =>
      (
        await import(
          './domain/products/components/card-product/card-product.component'
        )
      ).CardProductComponent,
  },
  {
    path: 'account',
    loadComponent: async () =>
      (await import('./domain/account/page/account.page')).AccountPage,
  },
  {
    title: 'Carrinho',
    path: 'cart',
    loadComponent: async () =>
      (await import('./domain/cart/page/product-cart.page')).CartPage,
  },

  {
    title: 'Página não encontrada',
    path: '**',
    pathMatch: 'full',
    loadComponent: async () =>
      (await import('./shared/components/not-found/not-found.component'))
        .NotFoundComponent,
  },
];
