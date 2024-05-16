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

export interface ProductCart
  extends Omit<ProductRequest, 'description' | 'category'> {
  unitaryPrice: number;
  quantity: number;
  marked: boolean;
}
