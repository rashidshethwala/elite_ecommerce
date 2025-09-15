import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { WishlistState, Product } from '../types';
import { useAuth } from './AuthContext';
import { wishlistService } from '../services/wishlistService';

type WishlistAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'LOAD_WISHLIST'; payload: Product[] };

interface WishlistContextType extends WishlistState {
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  clearWishlist: () => void;
  isInWishlist: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (exists) return state;

      return {
        items: [...state.items, action.payload],
      };
    }
    case 'REMOVE_ITEM': {
      return {
        items: state.items.filter(item => item.id !== action.payload),
      };
    }
    case 'CLEAR_WISHLIST':
      return {
        items: [],
      };
    case 'LOAD_WISHLIST':
      return {
        items: action.payload,
      };
    default:
      return state;
  }
};

const initialState: WishlistState = {
  items: [],
};

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);
  const { user } = useAuth();

  // Load wishlist from localStorage when user changes
  useEffect(() => {
    if (user) {
      wishlistService.getWishlist()
        .then((wishlistItems) => {
          const products = wishlistItems.map(item => item.product);
          dispatch({ type: 'LOAD_WISHLIST', payload: products });
        })
        .catch((error) => {
          console.error('Error loading wishlist:', error);
        });
    } else {
      // Clear wishlist when user logs out
      dispatch({ type: 'CLEAR_WISHLIST' });
    }
  }, [user]);

  const addItem = async (product: Product) => {
    if (!user) return;
    
    try {
      await wishlistService.addToWishlist(product.id);
      dispatch({ type: 'ADD_ITEM', payload: product });
    } catch (error) {
      console.error('Error adding item to wishlist:', error);
    }
  };

  const removeItem = async (id: string) => {
    if (!user) return;
    
    try {
      await wishlistService.removeFromWishlist(id);
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const isInWishlist = (id: string) => {
    return state.items.some(item => item.id === id);
  };

  return (
    <WishlistContext.Provider value={{
      ...state,
      addItem,
      removeItem,
      clearWishlist,
      isInWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};