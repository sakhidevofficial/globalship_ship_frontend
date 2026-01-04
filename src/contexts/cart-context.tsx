'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { botbleAPI } from '@/services/api';

interface CartItem {
  id: number;
  name: string;
  title: string;
  price: number[];
  price_formatted: string;
  image: string;
  qty: number;
  quantity: number;
  slug: string;
  href: string;
  badge?: [string, string];
  license?: string;
  description?: string;
  specs?: any;
}

interface CartState {
  items: CartItem[];
  cartId: string | null;
  loading: boolean;
  error: string | null;
  total: number;
  total_formatted: string;
  store: string;
}

type CartAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CART_ID'; payload: string }
  | { type: 'SET_CART_DATA'; payload: any }
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'UPDATE_ITEM'; payload: { id: number; qty: number } }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_STORE'; payload: string };

const initialState: CartState = {
  items: [],
  cartId: null,
  loading: false,
  error: null,
  total: 0,
  total_formatted: '$0.00',
  store: 'electronics'
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'SET_CART_ID':
      return { ...state, cartId: action.payload };
    
    case 'SET_STORE':
      return { ...state, store: action.payload };
    
    case 'SET_CART_DATA':
      const payload = action.payload || {};
            // Convert cart_items object to array if needed
        let items = [];
        if (payload.cart_items) {
          if (Array.isArray(payload.cart_items)) {
            items = payload.cart_items;
          } else {
            // Convert object to array and transform to expected format
            const cartItemsArray = Object.values(payload.cart_items);
            
            items = cartItemsArray.map((item: any) => ({
              id: item.id,
              name: item.name,
              title: item.name,
              price: [item.price || 0, item.original_price || 0],
              price_formatted: item.price_formatted || `$${item.price || 0}`,
              image: item.image || item.image_url || '',
              qty: item.quantity || 1,
              quantity: item.quantity || 1,
              slug: item.slug || '',
              href: item.slug ? `/shop/electronics/product?slug=${item.slug}` : '#',
              badge: item.badge || undefined,
              license: item.license || undefined,
              description: item.description || undefined,
              specs: item.specs || undefined
            }));
          }
        } else if (payload.items) {
          items = Array.isArray(payload.items) ? payload.items : [];
        }
      
      return {
        ...state,
        items: items,
        total: payload.order_total || payload.total || 0,
        total_formatted: payload.order_total_formatted || payload.total_formatted || '$0.00',
        loading: false,
        error: null
      };
    
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, qty: item.qty + action.payload.qty, quantity: item.qty + action.payload.qty }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.qty }]
      };
    
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, qty: action.payload.qty, quantity: action.payload.qty }
            : item
        )
      };
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
        total_formatted: '$0.00'
      };
    
    default:
      return state;
  }
}

interface CartContextType {
  state: CartState;
  cart: CartItem[];
  addToCart: (product: any) => Promise<void>;
  updateCartItem: (productId: number, qty: number) => Promise<void>;
  removeFromCart: (productId: number | string) => Promise<void>;
  clearCart: () => void;
  refreshCart: () => Promise<void>;
  processCheckout: (checkoutData?: any) => Promise<{ success: boolean; message: string; data?: any; token?: string }>;
  calculateTotal: () => number;
  calculateTotalDiscount: () => number;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  reloadCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Generate or get cart ID
  useEffect(() => {
    const cartId = localStorage.getItem('cart_id') || generateCartId();
    localStorage.setItem('cart_id', cartId);
    dispatch({ type: 'SET_CART_ID', payload: cartId });
    // Don't refresh cart on initialization - it will be empty initially
  }, []);

  function generateCartId(): string {
    // Generate UUID v4 format for Botble compatibility
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  const addToCart = async (product: any) => {
    if (!state.cartId) return;

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const productId = typeof product === 'number' ? product : product.id;
      const qty = product.quantity || 1;
      
              const response = await botbleAPI.addToCart(productId, qty, state.cartId);
      
      if (response.success) {
        // Update cart ID if returned from API
        if (response.data && response.data.id) {
          dispatch({ type: 'SET_CART_ID', payload: response.data.id });
          localStorage.setItem('cart_id', response.data.id);
        }
        
        // Update cart data if returned from API
        if (response.data) {
          dispatch({ type: 'SET_CART_DATA', payload: response.data });
        } else {
          // Fallback to refreshing cart
          await refreshCart();
        }
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.message });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add item to cart' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateCartItem = async (productId: number, qty: number) => {
    if (!state.cartId) return;

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const response = await botbleAPI.updateCartItem(state.cartId, productId, qty);
      
      if (response.success) {
        await refreshCart();
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.message });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update cart item' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const removeFromCart = async (productId: number | string) => {
    if (!state.cartId) return;

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const id = typeof productId === 'string' ? parseInt(productId) : productId;
      const response = await botbleAPI.removeFromCart(state.cartId, id);
      
      if (response.success) {
        await refreshCart();
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.message });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to remove item from cart' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const refreshCart = async () => {
    if (!state.cartId) return;

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const response = await botbleAPI.getCart(state.cartId);
      
      if (response.success) {
        dispatch({ type: 'SET_CART_DATA', payload: response.data });
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.message });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to refresh cart' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const processCheckout = async (checkoutData: any = {}) => {
    if (!state.cartId) return { success: false, message: 'Cart ID not found' };

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const response = await botbleAPI.processCheckout(state.cartId, checkoutData);
      
      if (response.success) {
        // Clear cart after successful checkout
        dispatch({ type: 'CLEAR_CART' });
        localStorage.removeItem('cart_id');
        return { success: true, data: response.data, token: response.token, message: 'Order processed successfully' };
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.message });
        return { success: false, message: response.message };
      }
    } catch (error) {
      const errorMessage = 'Failed to process checkout';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, message: errorMessage };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const calculateTotal = () => {
    return state.items.reduce((total, item) => {
      const price = item.price[0];
      return total + (price * item.qty);
    }, 0);
  };

  const calculateTotalDiscount = () => {
    return 0; // Implement discount calculation if needed
  };

  const increaseQuantity = (productId: number) => {
    const item = state.items.find(item => item.id === productId);
    if (item) {
      updateCartItem(productId, item.qty + 1);
    }
  };

  const decreaseQuantity = (productId: number) => {
    const item = state.items.find(item => item.id === productId);
    if (item && item.qty > 1) {
      updateCartItem(productId, item.qty - 1);
    } else if (item && item.qty === 1) {
      removeFromCart(productId);
    }
  };

  const reloadCart = async () => {
    await refreshCart();
  };

  const contextValue: CartContextType = {
    state,
    cart: state.items,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    refreshCart,
    processCheckout,
    calculateTotal,
    calculateTotalDiscount,
    increaseQuantity,
    decreaseQuantity,
    reloadCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(store?: string) {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  // Update store if provided
  if (store && context.state.store !== store) {
    context.state.store = store;
  }
  
  return context;
}
