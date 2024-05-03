import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { PulsoModule } from 'pulso-angular-components';
import { SharedModule } from '../../../../shared/shared.module';
import { ProductDetailsComponent } from '../../../product-details/component/product-details.component';
import { ProductRequest } from '../../interface/product.interface';
import { ProductService } from '../../service/product.service';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, SharedModule, ProductDetailsComponent, PulsoModule],
  templateUrl: './products.page.html',
  styleUrl: './products.page.scss',
})
export class ProductsPage implements OnInit {
  productsService = inject(ProductService);
  productsRequest: ProductRequest[] = JSON.parse(
    localStorage.getItem('products') ?? '[]'
  );

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsRequest = this.productsService.getProducts();
    localStorage.setItem('products', JSON.stringify(this.productsRequest));
  }
}
