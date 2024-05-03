import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LIST_OF_PRODUCT_OF_CART } from '../../../shared/constants/list-of-products-cart.constant';
import { LIST_OF_PRODUCTS } from '../../../shared/constants/list-of-products.constant';
import { ProductCart, ProductRequest } from '../interface/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  id: number = 0;
  private productCartNumber$ = new BehaviorSubject<number>(0);

  numberOfCart() {
    this.productCartNumber$.next(LIST_OF_PRODUCT_OF_CART.length);
    return this.productCartNumber$.asObservable();
  }

  createProduct(product: ProductRequest) {
    const products = LIST_OF_PRODUCTS.push({ ...product, id: ++this.id });
    return products;
  }

  createProductCart(product: ProductCart) {
    LIST_OF_PRODUCT_OF_CART.push(product);

    this.productCartNumber$.next(LIST_OF_PRODUCT_OF_CART.length);
    return LIST_OF_PRODUCT_OF_CART;
  }

  getProducts(): ProductRequest[] {
    return LIST_OF_PRODUCTS;
  }

  getProductsCart() {
    return LIST_OF_PRODUCT_OF_CART;
  }

  getOneProduct(id: number) {
    const product = LIST_OF_PRODUCTS.find((value) => value.id == id);
    return product!;
  }

  getOneProductCart(id: number) {
    const findProduct = LIST_OF_PRODUCT_OF_CART.find(
      (value) => value.id === id
    );
    return findProduct!;
  }
}
