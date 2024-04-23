import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { PulsoModule } from 'pulso-angular-components';
import { ProductRequest } from '../../interface/product.interface';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    PulsoModule,
    MatSelectModule,
  ],
  providers: [ShowOnDirtyErrorStateMatcher],
  templateUrl: './products.page.html',
  styleUrl: './products.page.scss',
})
export class ProductsPage implements OnInit {
  router = inject(Router);
  productsService = inject(ProductService);
  productsRequest: ProductRequest[];

  ngOnInit(): void {
    this.getProducts();
  }
  getProduct(id: string) {
    this.router.navigate(['/products-details'], {
      queryParams: { id: id },
    });
  }
  getProducts() {
    this.productsRequest = this.productsService.getProducts();
  }
}
