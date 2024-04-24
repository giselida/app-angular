import { Injectable } from '@angular/core';
import { LIST_OF_PRODUCTS } from '../../../shared/constants/list-of-products.constant';
import { ProductRequest } from '../interface/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}
  getProducts(): ProductRequest[] {
    return LIST_OF_PRODUCTS;
  }
  getOneProduct(id: string) {
    const product = LIST_OF_PRODUCTS.find((value) => value.id == id);
    return product!;
  }
}
