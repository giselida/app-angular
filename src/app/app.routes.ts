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
    loadComponent: () =>
      import('./domain/account/page/account.page').then((c) => c.AccountPage),
  },
  {
    title: 'Carrinho',
    path: 'cart',
    loadComponent: () =>
      import('./domain/cart/page/product-cart.page').then((c) => c.CartPage),
  },

  {
    title: 'Página não encontrada',
    path: '**',
    pathMatch: 'full',
    loadComponent: () =>
      import('./shared/components/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];
