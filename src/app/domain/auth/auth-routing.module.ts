import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthPage } from './page/auth/auth.page';

const authRoutes: Routes = [
  {
    path: '',
    component: AuthPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
})
export class AuthRoutingModule {}
