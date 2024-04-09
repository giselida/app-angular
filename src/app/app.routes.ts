import { Routes } from '@angular/router';
import { AuthPage } from './domain/auth/page/auth/auth.page';
import { TransactionComponent } from './domain/transaction/transaction.component';
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
    path: 'transaction',
    loadComponent: () => TransactionComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    loadComponent: () => NotFoundComponent,
  },
];
