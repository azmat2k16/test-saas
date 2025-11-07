// Defines the visual theme for a tenant's storefront
export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  backgroundColor: string;
}

// Represents a tenant (an individual store) in the SaaS platform
export interface Tenant {
  id: string;
  name: string;
  logoUrl: string;
  theme: Theme;
}

// Represents a product sold by a tenant
export interface Product {
  id: number;
  tenantId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

// Represents a product that has been added to the shopping cart
export interface CartItem extends Product {
  quantity: number;
}

// Defines the possible roles a user can have
export type UserRole = 'customer' | 'store';

// Represents a user in the system
export interface User {
  id: string;
  email: string;
  role: UserRole;
  tenantId?: string; // Associates a store owner with their tenant
}

// The shape of the response from a successful authentication request
export interface AuthResponse {
  token: string;
  user: User;
}

// Represents a customer order in the store admin dashboard
export interface Order {
  id: string;
  customerName: string;
  date: string;
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: { productName: string; quantity: number }[];
}
