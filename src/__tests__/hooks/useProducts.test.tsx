import { renderHook, act } from '@testing-library/react';
import { useProducts } from '../../hooks/useProducts';

describe('useProducts', () => {
  test('returns initial products and filters', () => {
    const { result } = renderHook(() => useProducts());
    
    expect(result.current.products).toBeDefined();
    expect(result.current.filters.category).toBe('All');
    expect(result.current.filters.searchQuery).toBe('');
    expect(result.current.filters.sortBy).toBe('featured');
    expect(result.current.currentPage).toBe(1);
  });

  test('updates filters correctly', () => {
    const { result } = renderHook(() => useProducts());
    
    act(() => {
      result.current.updateFilters({ category: 'Electronics' });
    });
    
    expect(result.current.filters.category).toBe('Electronics');
    expect(result.current.currentPage).toBe(1); // Should reset to first page
  });

  test('filters products by search query', () => {
    const { result } = renderHook(() => useProducts());
    
    act(() => {
      result.current.updateFilters({ searchQuery: 'MacBook' });
    });
    
    expect(result.current.filteredCount).toBeGreaterThan(0);
    expect(result.current.products.some(p => p.name.includes('MacBook'))).toBe(true);
  });

  test('filters products by category', () => {
    const { result } = renderHook(() => useProducts());
    
    act(() => {
      result.current.updateFilters({ category: 'Electronics' });
    });
    
    expect(result.current.products.every(p => p.category === 'Electronics')).toBe(true);
  });

  test('filters products by price range', () => {
    const { result } = renderHook(() => useProducts());
    
    act(() => {
      result.current.updateFilters({ priceRange: [0, 500] });
    });
    
    expect(result.current.products.every(p => p.price <= 500)).toBe(true);
  });

  test('sorts products correctly', () => {
    const { result } = renderHook(() => useProducts());
    
    act(() => {
      result.current.updateFilters({ sortBy: 'price-low' });
    });
    
    const prices = result.current.products.map(p => p.price);
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  });

  test('changes page correctly', () => {
    const { result } = renderHook(() => useProducts());
    
    act(() => {
      result.current.setCurrentPage(2);
    });
    
    expect(result.current.currentPage).toBe(2);
  });
});