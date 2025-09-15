export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  tags: string[];
  featured: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  id: number;
}

export interface User {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
}

// Helper to get full name
export const getUserFullName = (user: User): string => {
  return `${user.first_name} ${user.last_name}`.trim();
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  isLoading: boolean;
}

export interface FilterState {
  category: string;
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
  searchQuery: string;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'name';
}

export interface WishlistState {
  items: Product[];
}

export type SortOption = {
  value: FilterState['sortBy'];
  label: string;
};