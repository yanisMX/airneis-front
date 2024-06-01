"use client";

import React, { useEffect } from "react";
import { createContext, useState } from "react";
import { ShoppingCart, RootLayoutProps, Cart, CartItem } from "../interfaces/interfaces";
import { useAuth } from "./AuthContext";
import { getCallApiForUser } from "../api/getCallAPI";
import { calculateTotal } from "../utils/cartUtils";





const CartContext = createContext<ShoppingCart | undefined>(undefined);

export const CartProvider: React.FC<RootLayoutProps> = ({ children }) => {
  const [shoppingCart, setShoppingCart] = useState<Cart>({ items: [], total: 0 });
  const { user, isLoggedIn } = useAuth();
  const API_TO_UPDATE_CART = 'https://c1bb0d8a5f1d.airneis.net/api/user/basket';
  const [totalCartUser, setTotalCartUser] = useState<number>(0);

 


  const restoreUserCart = async () => {
    if (isLoggedIn && user?.accessToken) {
      try {
        const result: { success: boolean, basket: any, message: string } = await getCallApiForUser(API_TO_UPDATE_CART, user.accessToken);
        if (result.success) {
          const newBasket = result.basket;
          const mappedBasket: Cart = {
            items: newBasket.map((item: any) => ({
              product: item.product,
              quantity: item.quantity,
            })),
            total: calculateTotal(newBasket),
          };
          setShoppingCart(mappedBasket);
        } else {
          console.error('Erreur de connexion', result.message);
        }
      } catch (error) {
        console.error('Erreur lors de la restauration du panier', error);
      }
    } else {
      console.error('Utilisateur non connecté');
    }
  };

  useEffect(() => {
    if (isLoggedIn && user) {
      restoreUserCart();
    }
  }, [user]);

  useEffect(() => {
    console.log('Panier mis à jour :', shoppingCart);

  }, [shoppingCart]);



  return (
    <CartContext.Provider value={{ shoppingCart, setShoppingCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): ShoppingCart => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw Error('useCart must be used within an CartProvider');
  }
  return context;
}
