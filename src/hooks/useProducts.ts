import { useState, useMemo } from 'react';
import { Product, FilterState } from '../types';
import { sortOptions } from '../data/products';
import { productService } from '../services/productService';
import { useEffect } from 'react';

const ITEMS_PER_PAGE = 8;

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    priceRange: [0, 10000],
    rating: 0,
    inStock: false,
    searchQuery: '',
    sortBy: 'featured',
  });

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const orderingMap: Record<string, string> = {
          'featured': '-featured,-rating',
          'price-low': 'price',
          'price-high': '-price',
          'rating': '-rating',
          'name': 'name',
        };

        const response = await productService.getProducts({
          category: filters.category,
          search: filters.searchQuery,
          ordering: orderingMap[filters.sortBy],
          featured: filters.sortBy === 'featured' ? undefined : undefined,
          in_stock: filters.inStock || undefined,
          page: currentPage,
        });

        setProducts(response.results);
        setTotalCount(response.count);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, currentPage]);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product: Product) => {
      const matchesCategory = filters.category === 'All' || product.category === filters.category;
      const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      const matchesRating = product.rating >= filters.rating;
      const matchesStock = !filters.inStock || product.inStock;

      return matchesCategory && matchesPrice && matchesRating && matchesStock;
    });

    return filtered;
  }, [filters]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  return {
    products: filteredProducts,
    filteredCount: totalCount,
    totalPages,
    currentPage,
    setCurrentPage,
    filters,
    updateFilters,
    sortOptions,
    loading,
  };
};