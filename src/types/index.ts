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
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // In a real app, passwords should be hashed and handled securely
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