import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { cartKey } from '../../../../constants/cart-key';
import { LIST_OF_PRODUCT_OF_CART } from '../../../../shared/constants/list-of-products-cart.constant';
import { Entity } from '../../../../shared/interfaces/crud.interfaces';
import { BaseServiceApi } from '../../../../shared/services/base/base.service';
import { StorageService } from '../../../../shared/services/storage/storage.service';
import { ProductCart } from '../../interface/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartProductService extends BaseServiceApi<ProductCart> {
  override items: Entity<ProductCart>[] = LIST_OF_PRODUCT_OF_CART;
  productCartNumber$: BehaviorSubject<ProductCart[]>;
  sumCartNumber$: BehaviorSubject<ProductCart[]> = new BehaviorSubject(
    [] as ProductCart[]
  );
  router = inject(Router);
  storageService = inject(StorageService);

  constructor() {
    super();
    const products = JSON.parse(this.storageService.getItem(cartKey) ?? '[]');
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
    const sum = this.items.reduce((acc, obj) => {
      return acc + obj.price;
    }, 0);
    return sum;
  }

  sum() {
    const productsMap = [...new Set(this.items.map((product) => product.id))];
    const sumProducts = productsMap.map((productId) => {
      const findProducts = this.items.filter(
        (product) => product.id === productId
      );
      const sum = findProducts.reduce((acc, item) => acc + item.price, 0);
      return {
        ...findProducts[0],
        quantity: findProducts.length,
        price: sum,
      };
    });

    return sumProducts;
  }
}
