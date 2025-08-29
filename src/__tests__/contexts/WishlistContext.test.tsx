import { renderHook, act } from '@testing-library/react';
import { WishlistProvider, useWishlist } from '../../contexts/WishlistContext';
import { AuthProvider } from '../../contexts/AuthContext';
import { products } from '../../data/products';

const mockProduct = products[0];

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    <WishlistProvider>{children}</WishlistProvider>
  </AuthProvider>
);

describe('WishlistContext', () => {
  test('adds item to wishlist', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });
    
    act(() => {
      result.current.addItem(mockProduct);
    });
    
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].id).toBe(mockProduct.id);
    expect(result.current.isInWishlist(mockProduct.id)).toBe(true);
  });

  test('removes item from wishlist', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });
    
    act(() => {
      result.current.addItem(mockProduct);
      result.current.removeItem(mockProduct.id);
    });
    
    expect(result.current.items).toHaveLength(0);
    expect(result.current.isInWishlist(mockProduct.id)).toBe(false);
  });

  test('prevents duplicate items in wishlist', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });
    
    act(() => {
      result.current.addItem(mockProduct);
      result.current.addItem(mockProduct);
    });
    
    expect(result.current.items).toHaveLength(1);
  });

  test('clears wishlist', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });
    
    act(() => {
      result.current.addItem(mockProduct);
      result.current.addItem(products[1]);
      result.current.clearWishlist();
    });
    
    expect(result.current.items).toHaveLength(0);
  });

  test('checks if item is in wishlist', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });
    
    expect(result.current.isInWishlist(mockProduct.id)).toBe(false);
    
    act(() => {
      result.current.addItem(mockProduct);
    });
    
    expect(result.current.isInWishlist(mockProduct.id)).toBe(true);
  });
});