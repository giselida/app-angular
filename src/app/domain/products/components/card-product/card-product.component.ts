import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { cartKey } from '../../../../constants/cart-key';
import { CarouselComponent } from '../../../../shared/components/carousel/carousel.component';
import { SharedModule } from '../../../../shared/shared.module';
import { ProductRequest } from '../../interface/product.interface';
import { CartProductService } from '../../service/cart-product/cart-product.service';
import { ProductService } from '../../service/product/product.service';
import { ProductCart } from './../../interface/product.interface';

@Component({
  selector: 'card-product',
  standalone: true,
  imports: [CommonModule, SharedModule, CarouselComponent],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss',
})
export class CardProductComponent implements OnInit {
  router = inject(Router);
  @Input() product: ProductRequest | ProductCart;
  visibility: boolean = false;

  @Input() hasButtonView: boolean;
  @Input() hasButtonAdd: boolean = true;
  @Input() hasButtonBack: boolean = true;
  @Input() hasOperators: boolean = true;
  @Input() hasOptions: boolean = false;
  @Input() display: string = 'block';
  @Input() content: string = 'normal';

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

  addProductCart() {
    this.cartProductService
      .create(this.product as ProductCart)
      .subscribe((response) => {
        this.cardProducts = [
          response.data,
          ...this.cartProductService.productCartNumber$.value,
        ];
        this.cartProductService.productCartNumber$.next(this.cardProducts);
        localStorage.setItem(cartKey, JSON.stringify(this.cardProducts));
      });
  }

  backRoute() {
    history.back();
  }
  isProductRequest(
    product: ProductRequest | ProductCart
  ): product is ProductRequest {
    return !(product as ProductRequest)?.description;
  }
}
