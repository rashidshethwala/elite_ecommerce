import api from './api';
import { CartItem } from '../types';

export interface CartResponse {
  id: number;
  items: CartItem[];
  total: number;
  item_count: number;
  created_at: string;
  updated_at: string;
}

export const cartService = {
  async getCart(): Promise<CartResponse> {
    const response = await api.get('/orders/cart/');
    return response.data;
  },

  async addToCart(productId: string, quantity: number = 1): Promise<CartResponse> {
    const response = await api.post('/orders/cart/add/', {
      product_id: productId,
      quantity,
    });
    return response.data;
  },

  async updateCartItem(itemId: number, quantity: number): Promise<CartResponse> {
    const response = await api.put(`/orders/cart/update/${itemId}/`, {
      quantity,
    });
    return response.data;
  },

  async removeFromCart(itemId: number): Promise<CartResponse> {
    const response = await api.delete(`/orders/cart/remove/${itemId}/`);
    return response.data;
  },

  async clearCart(): Promise<CartResponse> {
    const response = await api.delete('/orders/cart/clear/');
    return response.data;
  },
};