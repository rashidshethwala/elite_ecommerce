import { render, screen, fireEvent } from '@testing-library/react';
import SortDropdown from '../../components/SortDropdown';
import { sortOptions } from '../../data/products';

describe('SortDropdown', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  test('renders all sort options', () => {
    render(
      <SortDropdown
        value="featured"
        options={sortOptions}
        onChange={mockOnChange}
      />
    );

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();

    // Check if all options are present
    sortOptions.forEach(option => {
      expect(screen.getByText(`Sort by: ${option.label}`)).toBeInTheDocument();
    });
  });

  test('calls onChange when selection changes', () => {
    render(
      <SortDropdown
        value="featured"
        options={sortOptions}
        onChange={mockOnChange}
      />
    );

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'price-low' } });

    expect(mockOnChange).toHaveBeenCalledWith('price-low');
  });

  test('displays correct selected value', () => {
    render(
      <SortDropdown
        value="price-high"
        options={sortOptions}
        onChange={mockOnChange}
      />
    );

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('price-high');
  });
});