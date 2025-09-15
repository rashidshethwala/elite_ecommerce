import api from './api';

export interface Order {
  id: number;
  order_number: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  shipping_address: string;
  billing_address: string;
  created_at: string;
  updated_at: string;
  items: Array<{
    id: number;
    product: {
      id: string;
      name: string;
      price: number;
      image: string;
    };
    quantity: number;
    price: number;
  }>;
}

export interface CreateOrderData {
  shipping_address: string;
  billing_address: string;
}

export const orderService = {
  async getOrders(): Promise<Order[]> {
    const response = await api.get('/orders/');
    return response.data.results || response.data;
  },

  async getOrder(id: number): Promise<Order> {
    const response = await api.get(`/orders/${id}/`);
    return response.data;
  },

  async createOrder(data: CreateOrderData): Promise<Order> {
    const response = await api.post('/orders/create/', data);
    return response.data;
  },
};