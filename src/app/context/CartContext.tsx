'use client';

import React, { useEffect, createContext, useState, useContext } from 'react';
import { ShoppingCart, RootLayoutProps, Cart } from '../interfaces/interfaces';
import { useAuth } from './AuthContext';
import { getCallApi } from '../api/get';
import { calculateTotal } from '../utils/cartUtils';

const CartContext = createContext<ShoppingCart | undefined>(undefined);

export const CartProvider: React.FC<RootLayoutProps> = ({ children }) => {
  const [shoppingCart, setShoppingCart] = useState<Cart>({ items: [], total: 0 });
  const { user, isLoggedIn } = useAuth();
  const API_TO_UPDATE_CART = 'https://c1bb0d8a5f1d.airneis.net/api/user/basket';

  const fetchUserCart = async (accessToken: string) => {
    try {
      const result: { success: boolean; basket: any; message: string } = await getCallApi(API_TO_UPDATE_CART, accessToken);
      if (result.success) {
        const newBasket = result.basket;
        const mappedBasket: Cart = {
          items: newBasket.map((item: any) => ({ product: item.product, quantity: item.quantity })),
          total: calculateTotal(newBasket),
        };
        setShoppingCart(mappedBasket);
      } else {
        console.error('Erreur de connexion:', result.message);
      }
    } catch (error) {
      console.error('Erreur lors de la restauration du panier:', error);
    }
  };

  const restoreUserCart = () => {
    if (isLoggedIn && user?.accessToken) {
      fetchUserCart(user.accessToken);
    } else {
      console.error('Utilisateur non connecté');
    }
  };

  useEffect(() => {
    restoreUserCart();
  }, [isLoggedIn, user]);

  return (
    <CartContext.Provider value={{ shoppingCart, setShoppingCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): ShoppingCart => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
