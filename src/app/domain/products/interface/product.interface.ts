export interface ProductResponse {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: {
    name: string;
    _id: string;
  };
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
export interface ProductRequest {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string | string[];
  category: {
    name: string;
    _id: string;
  };
}
