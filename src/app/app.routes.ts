import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './domain/product-details/product-details.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

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
    path: 'products-details',
    loadComponent: () => ProductDetailsComponent,
  },

  {
    title: 'Página não encontrada',
    path: '**',
    pathMatch: 'full',
    loadComponent: () => NotFoundComponent,
  },
];
