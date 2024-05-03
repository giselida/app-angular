export interface ProductRequest {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string[];
  category: {
    name: string;
    _id: string;
  };
}

export type ProductCart = Omit<ProductRequest, 'description' | 'category'>;
