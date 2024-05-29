import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { cartKey } from '../../../../constants/cart-key';
import { CarouselComponent } from '../../../../shared/components/carousel/carousel.component';
import { StorageService } from '../../../../shared/services/storage/storage.service';
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
    objectFit: string;
  } = {
    width: '400px',
    height: '400px',
    objectFit: 'contain',
  };
  @Input() showTitle = true;
  storageService = inject(StorageService);
  readonly productsService = inject(ProductService);
  readonly cartProductService = inject(CartProductService);
  readonly activatedRoute = inject(ActivatedRoute);

  cardProducts: ProductCart[] = JSON.parse(
    this.storageService.getItem(cartKey) ?? '[]'
  );
  intervalId: any;

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

  private getCartProduct() {
    this.cartProductService.getItems().subscribe((response) => {
      this.cardProducts = response.data;
      this.cartProductService.allProducts$.next(this.cardProducts);
    });
  }

  removeProduct(id: number) {
    this.cartProductService.remove(id).subscribe(() => {
      this.getCartProduct();
    });
  }

  addProductCart(product: ProductCart) {
    const productInMemory = this.findProduct(product);

    if (!productInMemory) {
      this.cartProductService
        .create(this.product as ProductCart)
        .subscribe((response) => {
          this.cardProducts = [
            response.data,
            ...this.cartProductService.allProducts$.value.filter(
              (product) => product.id != response.data.id
            ),
          ];
          this.getCartProduct();
        });
    } else {
      this.incrementProductQuantity(product);
    }
  }

  decrementProductQuantity(product: ProductCart) {
    const productInMemory = this.findProduct(product);

    if (!productInMemory) return;
    if (productInMemory.quantity === 1) {
      this.removeProduct(product.id);
    }

    productInMemory.quantity -= 1;
    productInMemory.price =
      productInMemory.unitaryPrice * productInMemory.quantity;
    this.cartProductService.productCart$.next(
      this.cartProductService.productCart$.value
    );
    this.updateLocalStorage();
  }

  incrementInterval(
    product: ProductCart,
    method: 'incrementProductQuantity' | 'decrementProductQuantity'
  ) {
    this.intervalId = setInterval(() => {
      this[method](product);
    }, 150);
  }

  removeInterval() {
    clearInterval(this.intervalId);
  }

  incrementProductQuantity(product: ProductCart) {
    const productInMemory = this.findProduct(product);
    if (!productInMemory) return;

    productInMemory.quantity += 1;
    productInMemory.price =
      productInMemory.unitaryPrice * productInMemory.quantity;
    this.cartProductService.productCart$.next(
      this.cartProductService.productCart$.value
    );
    this.updateLocalStorage();
  }

  private findProduct(product: ProductCart) {
    return this.cartProductService.productCart$.value.find(
      (item) => item.id == product.id
    );
  }

  private updateLocalStorage() {
    this.storageService.setItem(
      cartKey,
      JSON.stringify(this.cartProductService.productCart$.value)
    );
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
