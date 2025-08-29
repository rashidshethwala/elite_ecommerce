import React from 'react';
import { Filter, X } from 'lucide-react';
import { FilterState } from '../types';
import { categories } from '../data/products';

interface ProductFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: Partial<FilterState>) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFiltersChange,
  isOpen,
  onToggle
}) => {
  const clearFilters = () => {
    onFiltersChange({
      category: 'All',
      priceRange: [0, 10000],
      rating: 0,
      inStock: false,
      searchQuery: '',
      sortBy: 'featured',
    });
  };

  const hasActiveFilters = 
    filters.category !== 'All' ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 10000 ||
    filters.rating > 0 ||
    filters.inStock;

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={onToggle}
          className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
              Active
            </span>
          )}
        </button>
      </div>

      {/* Filter Panel */}
      <div className={`
        ${isOpen ? 'block' : 'hidden'} lg:block
        bg-white rounded-lg shadow-sm p-6 space-y-6
      `}>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Filters</h3>
          <div className="flex items-center space-x-2">
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Clear all
              </button>
            )}
            <button onClick={onToggle} className="lg:hidden">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Category</h4>
          <div className="space-y-2">
            {categories.map(category => (
              <label key={category} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={filters.category === category}
                  onChange={(e) => onFiltersChange({ category: e.target.value })}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.priceRange[0]}
                onChange={(e) => onFiltersChange({
                  priceRange: [parseInt(e.target.value) || 0, filters.priceRange[1]]
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="text-gray-500">to</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.priceRange[1]}
                onChange={(e) => onFiltersChange({
                  priceRange: [filters.priceRange[0], parseInt(e.target.value) || 10000]
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Minimum Rating</h4>
          <div className="space-y-2">
            {[4, 3, 2, 1].map(rating => (
              <label key={rating} className="flex items-center">
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={filters.rating === rating}
                  onChange={(e) => onFiltersChange({ rating: parseInt(e.target.value) })}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {rating}+ Stars
                </span>
              </label>
            ))}
            <label className="flex items-center">
              <input
                type="radio"
                name="rating"
                value="0"
                checked={filters.rating === 0}
                onChange={() => onFiltersChange({ rating: 0 })}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Any Rating</span>
            </label>
          </div>
        </div>

        {/* Availability Filter */}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => onFiltersChange({ inStock: e.target.checked })}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">In Stock Only</span>
          </label>
        </div>
      </div>
    </>
  );
};

export default ProductFilters;