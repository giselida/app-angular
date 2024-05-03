import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { CarouselComponent } from '../../../shared/components/carousel/carousel.component';
import { SharedModule } from '../../../shared/shared.module';
import { ProductRequest } from '../../products/interface/product.interface';
import { ProductService } from '../../products/service/product.service';
import { ProductCart } from './../../products/interface/product.interface';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, SharedModule, CarouselComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  @Input() product: ProductRequest;
  @Input() hasView: boolean;
  productsRequest: ProductRequest[];

  productRequest: ProductRequest = JSON.parse(
    localStorage.getItem('product') ?? '{}'
  );
  productsService = inject(ProductService);
  @Input() productCart: ProductCart;
  @Input() hasButtonBack: boolean = true;

  productCartRequest: ProductCart[] = JSON.parse(
    localStorage.getItem('ProductsCart') ?? '[]'
  );

  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(filter((params) => params['id']))
      .subscribe(({ id }) => {
        this.product = this.productsService.getOneProduct(id);
      });
    this.getProducts();
  }

  getProducts() {
    this.productsRequest = this.productsService.getProducts();
    localStorage.setItem('products', JSON.stringify(this.productsRequest));
  }
  addProductCart(id: number) {
    this.productsService.getOneProductCart(id);
    this.productCartRequest = this.productsService.createProductCart(
      this.product
    );
    this.productsService.numberOfCart();
    localStorage.setItem(
      'ProductsCart',
      JSON.stringify(this.productCartRequest)
    );
  }
}
