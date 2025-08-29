import { useState, useMemo } from 'react';
import { Product, FilterState } from '../types';
import { products, sortOptions } from '../data/products';

const ITEMS_PER_PAGE = 8;

export const useProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    priceRange: [0, 10000],
    rating: 0,
    inStock: false,
    searchQuery: '',
    sortBy: 'featured',
  });

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesCategory = filters.category === 'All' || product.category === filters.category;
      const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      const matchesRating = product.rating >= filters.rating;
      const matchesStock = !filters.inStock || product.inStock;
      const matchesSearch = !filters.searchQuery || 
        product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(filters.searchQuery.toLowerCase()));

      return matchesCategory && matchesPrice && matchesRating && matchesStock && matchesSearch;
    });

    // Apply sorting
    return filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'featured':
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating; // Secondary sort by rating
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [filters]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  return {
    products: paginatedProducts,
    filteredCount: filteredProducts.length,
    totalPages,
    currentPage,
    setCurrentPage,
    filters,
    updateFilters,
    sortOptions,
  };
};