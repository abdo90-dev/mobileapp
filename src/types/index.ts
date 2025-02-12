export interface User {
  id: string;
  email: string;
  name: string;
  addresses: Address[];
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  priceRange: string;
  cuisine: string;
  address: string;
  menu: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  postalCode: string;
  label: string;
}

export interface Order {
  id: string;
  restaurantId: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'delivered';
  items: OrderItem[];
  total: number;
  deliveryAddress: Address;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Review {
  id: string;
  restaurantId: string;
  userId: string;
  rating: number;
  comment: string;
  date: string;
}