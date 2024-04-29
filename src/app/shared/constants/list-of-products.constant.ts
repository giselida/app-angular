import { ProductRequest } from '../../domain/products/interface/product.interface';

export const LIST_OF_PRODUCTS: ProductRequest[] = [
  {
    id: 0,
    title: 'Regata Básica',
    price: 20.0,
    description:
      'Blusa confeccionada em meia malha, um tecido de toque macio e com ótimo caimento. Modelo possui decote em "U" e alças largas. As blusas básicas são atemporais e indispensáveis no guarda-roupa feminino. São modelos que combinam com diversos estilos e situações, além de ter a melhor qualidade e durabilidade do mercado de moda brasileira. Uma peça clássica e atemporal que pode ser usada no trabalho, faculdade ou em dias de lazer.',
    image: [
      'https://static.ferju.com.br/public/ferju/imagens/produtos/regata-feminina-adulto-lisa-com-lycra-1000004492-malwee-preto-11877.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBB9gYfc1eYbeuCOIG7BGIUOovaG7uOSZkow&s',
      'https://www.shutterstock.com/image-vector/blank-womens-tank-top-front-260nw-184878884.jpg',
    ],
    category: {
      name: 'Roupas',
      _id: 'string',
    },
  },
  {
    id: 1,
    title: 'Calça jeans',
    price: 80.0,
    description:
      'Imagina só uma calça jeans que é puro estilo e conforto ao mesmo tempo? É a nossa famosa calça jeans mom preta! Ela tem um corte vintage e cintura alta que vão fazer você arrasar por onde passar. Ela é confeccionada em jeans 100% algodão que é super macia e confortável, perfeita pra você que não abre mão do estilo e conforto no seu dia a dia.  Além disso, a cor preta é super versátil e fácil de combinar, então você pode usar e abusar da sua criatividade e montar vários looks diferentes. Não perde tempo, garanta agora mesmo a sua calça jeans mom preta e arrase por aí! .',
    image: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj0Xjox0sFFkJ7cRHg3PY_DxlnSrDvKoBF5w&s',
      'https://cdn.awsli.com.br/2500x2500/2396/2396219/produto/216640748/6-mm96n8pg4j.jpg',
      'https://cdn.awsli.com.br/2500x2500/2396/2396219/produto/216640748/img_e8054-exmgyvlzmy.JPG',
    ],
    category: {
      name: 'Roupas',
      _id: 'string',
    },
  },
  {
    id: 2,
    title: 'Regata Básica',
    price: 20.0,
    description:
      'Perfeita para sublimação, com tecido 100% em Poliéster, agradável ao toque e super confortável Este produto conta com acabamento fino e gola redonda, o que deixa a peça com um ótimo caimento e o conforto que você merece',
    image: [
      'https://images.tcdn.com.br/img/img_prod/633191/regata_em_cotton_vermelha_10629_1_d91cf3160e69597dbe5c6ad3dc04c7c3_20220615204313.jpg',
    ],
    category: {
      name: 'Roupas',
      _id: 'string',
    },
  },
];
