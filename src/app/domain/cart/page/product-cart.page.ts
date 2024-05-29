import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { CarouselComponent } from '../../../shared/components/carousel/carousel.component';
import { SharedModule } from '../../../shared/shared.module';
import { CardProductComponent } from '../../products/components/card-product/card-product.component';
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
    MatCheckboxModule,
  ],
  templateUrl: './product-cart.page.html',
  styleUrl: './product-cart.page.scss',
})
export class CartPage implements OnInit {
  carouselConfig = {
    width: '100%',
    height: '100px',
    objectFit: 'contain',
  };

  cardContent = {
    display: 'flex',
    content: 'space-between',
  };

  price: number;
  cartProductService = inject(CartProductService);

  ngOnInit(): void {
    this.cartProductService.productCart$.subscribe(() => {
      this.updatePrice();
    });
  }

  updatePrice() {
    this.price = this.cartProductService.sumPriceOfCart();
  }
}
