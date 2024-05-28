import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { cartKey } from '../../../../constants/cart-key';
import { Entity } from '../../../../shared/interfaces/crud.interfaces';
import { BaseServiceApi } from '../../../../shared/services/base/base.service';
import { StorageService } from '../../../../shared/services/storage/storage.service';
import { ProductCart } from '../../interface/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartProductService extends BaseServiceApi<ProductCart> {
  override items: Entity<ProductCart>[];

  allProducts$: BehaviorSubject<ProductCart[]>;

  productCart$: BehaviorSubject<ProductCart[]> = new BehaviorSubject(
    [] as ProductCart[]
  );

  router = inject(Router);

  storageService = inject(StorageService);

  get allComplete(): boolean {
    return this.productCart$.value.every((item) => item.marked);
  }

  constructor() {
    super();
    const products = JSON.parse(this.storageService.getItem(cartKey) ?? '[]');
    this.allProducts$ = new BehaviorSubject<ProductCart[]>([...products]);
    this.allProducts$.subscribe((items) => {
      this.items = items;
      this.productCart$.next(this.sum());
    });
  }

  numberOfCart() {
    return this.productCart$.asObservable().pipe(map((value) => value.length));
  }

  updateCart() {
    this.productCart$.next(this.sum());
  }

  someComplete(): boolean {
    const someProduct =
      this.productCart$.value.some((t) => t.marked) && !this.allComplete;
    return someProduct;
  }

  setAll(completed: boolean) {
    this.productCart$.value.forEach((t) => (t.marked = completed));
    this.saveProductsToStorage(this.items);
  }

  sumPriceOfCart() {
    return this.productCart$.value.reduce((acc, obj) => {
      if (obj.marked) {
        acc = acc + obj.price;
      }
      return acc;
    }, 0);
  }

  sum() {
    this.saveProductsToStorage(this.items);

    const productsMap = [...new Set(this.items.map((product) => product.id))];

    const uniqueProductIds = productsMap.map((productId) => {
      const findProducts = this.items.filter(
        (product) => product.id === productId
      );
      const sum = findProducts.reduce((acc, item) => acc + item.price, 0);

      return {
        ...findProducts[0],
        quantity: findProducts.length,
        price: sum,
        unitaryPrice: findProducts[0].price,
      };
    });

    return uniqueProductIds;
  }
  private saveProductsToStorage(items: ProductCart[]) {
    this.storageService.setItem(cartKey, JSON.stringify(items));
  }
}
