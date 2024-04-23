import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { PulsoModule } from 'pulso-angular-components';
import { ProductRequest } from '../../interface/product.interface';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    PulsoModule,
    MatSelectModule,
  ],
  providers: [ShowOnDirtyErrorStateMatcher],
  templateUrl: './products.page.html',
  styleUrl: './products.page.scss',
})
export class ProductsPage {
  constructor(private router: Router) {}

  productsRequest: ProductRequest[] = [
    {
      id: '0',
      title: 'Regata Básica',
      price: 20.0,
      description:
        'Blusa confeccionada em meia malha, um tecido de toque macio e com ótimo caimento. Modelo possui decote em "U" e alças largas. As blusas básicas são atemporais e indispensáveis no guarda-roupa feminino. São modelos que combinam com diversos estilos e situações, além de ter a melhor qualidade e durabilidade do mercado de moda brasileira. Uma peça clássica e atemporal que pode ser usada no trabalho, faculdade ou em dias de lazer.',
      image: [
        'https://static.ferju.com.br/public/ferju/imagens/produtos/regata-feminina-adulto-lisa-com-lycra-1000004492-malwee-preto-11877.jpg',
      ],
      category: {
        name: 'Roupas',
        _id: 'string',
      },
    },
    {
      id: '1',
      title: 'Regata Básica',
      price: 20.0,
      description:
        'Blusa confeccionada em meia malha, um tecido de toque macio e com ótimo caimento. Modelo possui decote em "U" e alças largas. As blusas básicas são atemporais e indispensáveis no guarda-roupa feminino. São modelos que combinam com diversos estilos e situações, além de ter a melhor qualidade e durabilidade do mercado de moda brasileira. Uma peça clássica e atemporal que pode ser usada no trabalho, faculdade ou em dias de lazer.',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBB9gYfc1eYbeuCOIG7BGIUOovaG7uOSZkow&s',
      category: {
        name: 'Roupas',
        _id: 'string',
      },
    },
    {
      id: '2',
      title: 'Regata Básica',
      price: 20.0,
      description:
        'Blusa confeccionada em meia malha, um tecido de toque macio e com ótimo caimento. Modelo possui decote em "U" e alças largas. As blusas básicas são atemporais e indispensáveis no guarda-roupa feminino. São modelos que combinam com diversos estilos e situações, além de ter a melhor qualidade e durabilidade do mercado de moda brasileira. Uma peça clássica e atemporal que pode ser usada no trabalho, faculdade ou em dias de lazer.',
      image:
        'https://static.ferju.com.br/public/ferju/imagens/produtos/regata-feminina-adulto-lisa-com-lycra-1000004492-malwee-preto-11877.jpg',
      category: {
        name: 'Roupas',
        _id: 'string',
      },
    },
  ];
  getProduct(id: string) {
    console.log(id);
    this.router.navigate(['/products-details'], {
      queryParams: { id: id },
    });
  }
}
