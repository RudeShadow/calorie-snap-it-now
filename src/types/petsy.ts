export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  features: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  lowStock?: boolean;
  category: 'tool' | 'accessory';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface UserProfile {
  petType: 'dog' | 'cat' | 'both';
  preferences?: string[];
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}