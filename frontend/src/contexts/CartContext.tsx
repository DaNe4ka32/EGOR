import React, { useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { CartItem } from "../hooks/useCart";
import { CartContext } from "./CartContextValue";
import { useAuth } from "../hooks/useAuth";

const getCartStorageKey = (userId?: number) =>
  userId ? `cart_${userId}` : "cart_guest";

const getInitialCart = (userId?: number): CartItem[] => {
  const key = getCartStorageKey(userId);
  const storedCart = localStorage.getItem(key);
  return storedCart ? JSON.parse(storedCart) : [];
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>(() => getInitialCart(user?.id));

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setCart(getInitialCart(user?.id));
  }, [user?.id]);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    const key = getCartStorageKey(user?.id);
    localStorage.setItem(key, JSON.stringify(newCart));
  };

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    const existingItem = cart.find(
      (cartItem) => cartItem.id === item.id && cartItem.size === item.size
    );
    if (existingItem) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id && cartItem.size === item.size
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      saveCart(updatedCart);
    } else {
      saveCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: number, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, size);
      return;
    }
    const updatedCart = cart.map((item) =>
      item.id === id && item.size === size ? { ...item, quantity } : item
    );
    saveCart(updatedCart);
  };

  const removeFromCart = (id: number, size: string) => {
    const updatedCart = cart.filter(
      (item) => !(item.id === id && item.size === size)
    );
    saveCart(updatedCart);
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const value = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    getTotal,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
