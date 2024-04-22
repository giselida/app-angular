import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  template: `<div class="not-found-container">
      <span class="glitch">404</span>
      <span class="offset">404</span>
      <span>404</span>
    </div>
    <p>
      A página que você procura pode ter sido removida, seu URL alterado ou
      estar temporariamente indisponível.
    </p>
    <button mat-raised-button color="primary" [routerLink]="['/products']">
      Pagina inicial
    </button> `,
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {}
