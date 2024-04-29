import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PulsoModule } from 'pulso-angular-components';
import { SharedModule } from '../../../../shared/shared.module';
import { ProductDetailsComponent } from '../../../product-details/component/product-details.component';
import {
  CartProductRequest,
  ProductRequest,
} from '../../interface/product.interface';
import { ProductService } from '../../service/product.service';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, SharedModule, ProductDetailsComponent, PulsoModule],
  templateUrl: './products.page.html',
  styleUrl: './products.page.scss',
})
export class ProductsPage implements OnInit {
  router = inject(Router);
  productsService = inject(ProductService);
  productsRequest: ProductRequest[];

  ngOnInit(): void {
    this.productsRequest = JSON.parse(localStorage.getItem('products') ?? '[]');

    this.getProducts();
  }
  cartProductList: CartProductRequest[];

  addProductToCart(product: CartProductRequest) {
    const productExistInCart = this.cartProductList.find(
      ({ title }) => title === product.title
    );
    console.log(productExistInCart);
  }
  removeProduct(product: CartProductRequest) {
    this.cartProductList = this.cartProductList.filter(
      ({ title }) => title !== product.title
    );
  }
  getProducts() {
    this.productsRequest = this.productsService.getProducts();
    localStorage.setItem('products', JSON.stringify(this.productsRequest));
  }
}
