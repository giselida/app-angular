import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}
  getProducts() {
    return [
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
  }
}
