import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsPage } from './page/products/products.page';

const authRoutes: Routes = [
  {
    path: '',
    component: ProductsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
})
export class ProductsRoutingModule {}
