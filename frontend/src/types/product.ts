export interface ProductSize {
  size: string;
  available: boolean;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  fullDescription?: string; // Полное описание
  image: string;
  price: number;
  category: string;
  sizes: ProductSize[];
}

export interface Comment {
  id: number;
  productId: number;
  user: string;
  text: string;
  date: string;
}

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  size: string;
  image: string;
  quantity: number;
}

export interface ShippingInfo {
  name: string;
  address: string;
  phone: string;
}

export interface PaymentInfo {
  type: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
}

export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  total: number;
  shippingInfo: ShippingInfo;
  paymentInfo: PaymentInfo;
  date: string;
}
