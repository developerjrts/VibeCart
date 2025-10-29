export interface product {
  _id?: string;
  name: string;
  description: string;
  poster: string;
  category: string;
  price: number;
  stock: number;
  rating?: number;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface cartItem {
  _id: string;
  productId: product;
  quantity: number;
}

export interface cart {
  _id: string;
  userId: string;
  items: cartItem[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
