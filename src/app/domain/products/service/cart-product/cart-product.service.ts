import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { cartKey } from '../../../../constants/cart-key';
import { LIST_OF_PRODUCT_OF_CART } from '../../../../shared/constants/list-of-products-cart.constant';
import { Entity } from '../../../../shared/interfaces/crud.interfaces';
import { BaseServiceApi } from '../../../../shared/services/base/base.service';
import { ProductCart } from '../../interface/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartProductService extends BaseServiceApi<ProductCart> {
  override items: Entity<ProductCart>[] = LIST_OF_PRODUCT_OF_CART;
  productCartNumber$: BehaviorSubject<ProductCart[]>;
  router = inject(Router);

  constructor() {
    super();
    const products = JSON.parse(localStorage.getItem(cartKey) ?? '[]');
    this.items = products;
    this.productCartNumber$ = new BehaviorSubject<ProductCart[]>([...products]);
  }

  get isCart() {
    return this.router.url === '/cart';
  }

  numberOfCart() {
    return this.productCartNumber$
      .asObservable()
      .pipe(map((value) => value.length));
  }
  sumPriceOfCart() {
    const sum = this.items.reduce(function (acc, obj) {
      return acc + obj.price;
    }, 0);
    return sum;
  }
}
