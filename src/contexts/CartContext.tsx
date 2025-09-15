import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { CartState, CartItem, Product } from '../types';
import { useAuth } from './AuthContext';
import { cartService } from '../services/cartService';

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] }
  | { type: 'SET_LOADING'; payload: boolean };

interface CartContextType extends CartState {
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
};

const calculateItemCount = (items: CartItem[]): number => {
  return items.reduce((count, item) => count + item.quantity, 0);
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.product.id === action.payload.id);

      let newItems: CartItem[];
      if (existingItem) {
        newItems = state.items.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { product: action.payload, quantity: 1 }];
      }

      return {
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems),
      };
    }
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.product.id !== action.payload);
      return {
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems),
      };
    }
    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.product.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0);

      return {
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems),
      };
    }
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
        itemCount: 0,
      };
    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload,
        total: calculateTotal(action.payload),
        itemCount: calculateItemCount(action.payload),
        isLoading: false,
      };
    default:
      return state;
  }
};

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  isLoading: false,
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user } = useAuth();

  // Load cart from localStorage when user changes
  useEffect(() => {
    if (user) {
      dispatch({ type: 'SET_LOADING', payload: true });
      cartService.getCart()
        .then((cartData) => {
          dispatch({ type: 'LOAD_CART', payload: cartData.items });
        })
        .catch((error) => {
          console.error('Error loading cart:', error);
          dispatch({ type: 'SET_LOADING', payload: false });
        });
    } else {
      // Clear cart when user logs out
      dispatch({ type: 'CLEAR_CART' });
    }
  }, [user]);

  const addItem = async (product: Product) => {
    if (!user) return;
    
    try {
      const cartData = await cartService.addToCart(product.id);
      dispatch({ type: 'LOAD_CART', payload: cartData.items });
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const removeItem = async (id: string) => {
    if (!user) return;
    
    try {
      // Find the cart item by product id
      const cartItem = state.items.find(item => item.product.id === id);
      if (cartItem) {
        const cartData = await cartService.removeFromCart(cartItem.id);
        dispatch({ type: 'LOAD_CART', payload: cartData.items });
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (!user) return;
    
    try {
      // Find the cart item by product id
      const cartItem = state.items.find(item => item.product.id === id);
      if (cartItem) {
        const cartData = await cartService.updateCartItem(cartItem.id, quantity);
        dispatch({ type: 'LOAD_CART', payload: cartData.items });
      }
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const clearCart = async () => {
    if (!user) return;
    
    try {
      const cartData = await cartService.clearCart();
      dispatch({ type: 'LOAD_CART', payload: cartData.items });
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ 
      ...state, 
      addItem, 
      removeItem, 
      updateQuantity, 
      clearCart,
      isLoading: state.isLoading 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};