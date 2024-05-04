import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { PulsoModule } from 'pulso-angular-components';
import { SharedModule } from '../../../../shared/shared.module';
import { CardProductComponent } from '../../components/cart-product/cart-product.component';
import { ProductRequest } from '../../interface/product.interface';
import { ProductService } from '../../service/product/product.service';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, SharedModule, CardProductComponent, PulsoModule],
  templateUrl: './products.page.html',
  styleUrl: './products.page.scss',
})
export class ProductsPage implements OnInit {
  productsService = inject(ProductService);
  productsRequest: ProductRequest[];
  carouselConfig = {
    width: '100%',
    height: '200px',
    objectFIt: 'contain',
  };
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getItems().subscribe((response) => {
      this.productsRequest = response.data;
    });
  }
}
