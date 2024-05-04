import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { cartKey } from '../../../../constants/cart-key';
import { Entity } from '../../../../shared/interfaces/crud.interfaces';
import { BaseServiceApi } from '../../../../shared/services/base/base.service';
import { ProductCart } from '../../interface/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartProductService extends BaseServiceApi<ProductCart> {
  override items: Entity<ProductCart>[];
  productCartNumber$: BehaviorSubject<ProductCart[]>;

  constructor() {
    super();
    const products = JSON.parse(localStorage.getItem(cartKey) ?? '[]');
    this.items = products;
    this.productCartNumber$ = new BehaviorSubject<ProductCart[]>([...products]);
  }
  numberOfCart() {
    return this.productCartNumber$
      .asObservable()
      .pipe(map((value) => value.length));
  }
}
