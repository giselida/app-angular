import { Injectable } from '@angular/core';
import { LIST_OF_PRODUCTS } from '../../../../shared/constants/list-of-products.constant';
import { Entity } from '../../../../shared/interfaces/crud.interfaces';
import { BaseServiceApi } from '../../../../shared/services/base/base.service';
import { ProductRequest } from '../../interface/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseServiceApi<ProductRequest> {
  override items: Entity<ProductRequest>[] = LIST_OF_PRODUCTS;
}
