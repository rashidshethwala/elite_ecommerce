import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../../contexts/CartContext';
import { products } from '../../data/products';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

const mockProduct = products[0];

describe('CartContext', () => {
  test('adds item to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addItem(mockProduct);
    });
    
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].product.id).toBe(mockProduct.id);
    expect(result.current.items[0].quantity).toBe(1);
    expect(result.current.itemCount).toBe(1);
    expect(result.current.total).toBe(mockProduct.price);
  });

  test('increases quantity when adding same item', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addItem(mockProduct);
      result.current.addItem(mockProduct);
    });
    
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.itemCount).toBe(2);
    expect(result.current.total).toBe(mockProduct.price * 2);
  });

  test('removes item from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addItem(mockProduct);
      result.current.removeItem(mockProduct.id);
    });
    
    expect(result.current.items).toHaveLength(0);
    expect(result.current.itemCount).toBe(0);
    expect(result.current.total).toBe(0);
  });

  test('updates item quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addItem(mockProduct);
      result.current.updateQuantity(mockProduct.id, 3);
    });
    
    expect(result.current.items[0].quantity).toBe(3);
    expect(result.current.itemCount).toBe(3);
    expect(result.current.total).toBe(mockProduct.price * 3);
  });

  test('removes item when quantity is set to 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addItem(mockProduct);
      result.current.updateQuantity(mockProduct.id, 0);
    });
    
    expect(result.current.items).toHaveLength(0);
  });

  test('clears cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addItem(mockProduct);
      result.current.addItem(products[1]);
      result.current.clearCart();
    });
    
    expect(result.current.items).toHaveLength(0);
    expect(result.current.itemCount).toBe(0);
    expect(result.current.total).toBe(0);
  });
});