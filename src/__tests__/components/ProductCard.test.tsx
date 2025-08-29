import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import { CartProvider } from '../../contexts/CartContext';
import { products } from '../../data/products';

const mockProduct = products[0];

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <CartProvider>
        {component}
      </CartProvider>
    </BrowserRouter>
  );
};

describe('ProductCard', () => {
  test('renders product information correctly', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price.toLocaleString()}`)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.rating.toString())).toBeInTheDocument();
  });

  test('handles add to cart button click', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    
    const addButton = screen.getByRole('button', { name: /add/i });
    fireEvent.click(addButton);
    
    // Button should be clickable for in-stock items
    expect(addButton).not.toBeDisabled();
  });

  test('disables add to cart for out of stock items', () => {
    const outOfStockProduct = { ...mockProduct, inStock: false };
    renderWithProviders(<ProductCard product={outOfStockProduct} />);
    
    const addButton = screen.getByRole('button', { name: /add/i });
    expect(addButton).toBeDisabled();
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
  });

  test('calls onClick when product card is clicked', () => {
    const mockOnClick = vi.fn();
    renderWithProviders(<ProductCard product={mockProduct} onClick={mockOnClick} />);
    
    const productCard = screen.getByRole('img', { name: mockProduct.name }).closest('div');
    fireEvent.click(productCard!);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});