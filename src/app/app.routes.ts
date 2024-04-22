import { Routes } from '@angular/router';
import { AuthPage } from './domain/auth/page/auth/auth.page';
import { ProductsPage } from './domain/products/page/products/products.page';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },

  {
    path: 'auth',
    loadComponent: () => AuthPage,
  },
  {
    title: 'Produtos',
    path: 'products',
    loadComponent: () => ProductsPage,
  },
  {
    title: 'Página não encontrada',
    path: '**',
    pathMatch: 'full',
    loadComponent: () => NotFoundComponent,
  },
];
