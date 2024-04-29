import { Injectable } from '@angular/core';
import { LIST_OF_PRODUCTS } from '../../../shared/constants/list-of-products.constant';
import { ProductRequest } from '../interface/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  id: number = 0;

  createProduct(product: ProductRequest) {
    const products = LIST_OF_PRODUCTS.push({ ...product, id: ++this.id });
    return products;
  }
  getProducts(): ProductRequest[] {
    return LIST_OF_PRODUCTS;
  }
  getOneProduct(id: number) {
    const product = LIST_OF_PRODUCTS.find((value) => value.id == id);
    return product!;
  }
}
