import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { CarouselComponent } from '../../../shared/components/carousel/carousel.component';
import { SharedModule } from '../../../shared/shared.module';
import { CardProductComponent } from '../../products/components/cart-product/cart-product.component';
import { CartProductService } from '../../products/service/cart-product/cart-product.service';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MatDividerModule,
    CardProductComponent,
    CarouselComponent,
  ],
  templateUrl: './product-cart.page.html',
  styleUrl: './product-cart.page.scss',
})
export class CartPage {
  cartProductService = inject(CartProductService);
}
