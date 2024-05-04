import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { cartKey } from '../../../../constants/cart-key';
import { CarouselComponent } from '../../../../shared/components/carousel/carousel.component';
import { SharedModule } from '../../../../shared/shared.module';
import { ProductCart, ProductRequest } from '../../interface/product.interface';
import { CartProductService } from '../../service/cart-product/cart-product.service';
import { ProductService } from '../../service/product/product.service';

@Component({
  selector: 'card-product',
  standalone: true,
  imports: [CommonModule, SharedModule, CarouselComponent],
  templateUrl: './cart-product.component.html',
  styleUrl: './cart-product.component.scss',
})
export class CardProductComponent implements OnInit {
  @Input() product: ProductRequest | ProductCart;
  @Input() hasView: boolean;
  @Input() hasButtonBack: boolean = true;

  @Input() carouselConfig: {
    width: string;
    height: string;
    objectFIt: string;
  } = {
    width: '400px',
    height: '400px',
    objectFIt: 'contain',
  };

  readonly productsService = inject(ProductService);
  readonly cartProductService = inject(CartProductService);
  readonly activatedRoute = inject(ActivatedRoute);

  cardProducts: ProductCart[] = JSON.parse(
    localStorage.getItem(cartKey) ?? '[]'
  );

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        filter((params) => params['id']),
        switchMap(({ id }) => {
          return this.productsService.getOne(id);
        })
      )
      .subscribe(({ data }) => {
        this.product = data;
      });
  }

  addProductCart(id: number) {
    this.cartProductService
      .create(this.product as ProductCart)
      .subscribe((response) => {
        this.cardProducts = [
          ...this.cartProductService.productCartNumber$.value,
          response.data,
        ];
        this.cartProductService.productCartNumber$.next(this.cardProducts);
        localStorage.setItem(cartKey, JSON.stringify(this.cardProducts));
      });
  }
  isProductRequest(
    product: ProductRequest | ProductCart
  ): product is ProductRequest {
    return !!(product as ProductRequest)?.description;
  }
}
