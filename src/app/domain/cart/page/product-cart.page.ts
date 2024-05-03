import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { CarouselComponent } from '../../../shared/components/carousel/carousel.component';
import { SharedModule } from '../../../shared/shared.module';
import { ProductDetailsComponent } from '../../product-details/component/product-details.component';
import { ProductService } from '../../products/service/product.service';
import { ProductCart } from './../../products/interface/product.interface';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MatDividerModule,
    ProductDetailsComponent,
    CarouselComponent,
  ],
  templateUrl: './product-cart.page.html',
  styleUrl: './product-cart.page.scss',
})
export class CartPage implements OnInit {
  productsCartRequest: ProductCart[] = JSON.parse(
    localStorage.getItem('ProductsCart') ?? '[]'
  );
  productsService = inject(ProductService);
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    localStorage.setItem(
      'ProductsCart',
      JSON.stringify(this.productsCartRequest)
    );
  }
}
