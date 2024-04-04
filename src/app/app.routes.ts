import { Routes } from '@angular/router';
import { AuthComponent } from './domain/auth/page/auth/auth.component';
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
    loadComponent: () => AuthComponent,
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
