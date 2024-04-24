import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { ProductRequest } from '../products/interface/product.interface';
import { ProductService } from '../products/service/product.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
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

  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(filter((params) => params['id']))
      .subscribe(({ id }) => {
        this.product = this.productsService.getOneProduct(id);
      });
  }
}
