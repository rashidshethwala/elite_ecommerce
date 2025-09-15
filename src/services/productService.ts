import api from './api';
import { Product } from '../types';

export interface ProductFilters {
  category?: string;
  search?: string;
  ordering?: string;
  featured?: boolean;
  in_stock?: boolean;
  page?: number;
}

export interface ProductListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}

export const productService = {
  async getProducts(filters: ProductFilters = {}): Promise<ProductListResponse> {
    const params = new URLSearchParams();
    
    if (filters.category && filters.category !== 'All') {
      params.append('category__name', filters.category);
    }
    if (filters.search) {
      params.append('search', filters.search);
    }
    if (filters.ordering) {
      params.append('ordering', filters.ordering);
    }
    if (filters.featured !== undefined) {
      params.append('featured', filters.featured.toString());
    }
    if (filters.in_stock !== undefined) {
      params.append('in_stock', filters.in_stock.toString());
    }
    if (filters.page) {
      params.append('page', filters.page.toString());
    }

    const response = await api.get(`/products/?${params.toString()}`);
    return response.data;
  },

  async getProduct(id: string): Promise<Product> {
    const response = await api.get(`/products/${id}/`);
    return response.data;
  },

  async getCategories(): Promise<Array<{ id: number; name: string; description: string }>> {
    const response = await api.get('/products/categories/');
    return response.data;
  },
};