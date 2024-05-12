"use client";

import React from "react"; 
import { createContext, useState } from "react";
import { ShoppingCart,RootLayoutProps, Cart } from "../interfaces/interfaces";




const CartContext = createContext< ShoppingCart|undefined>(undefined);

export const CartProvider: React.FC<RootLayoutProps> = ({ children}) => {
    const [shoppingCart, setShoppingCart] = useState<Cart[]>([]);
  
  
    return (
      <CartContext.Provider value={{shoppingCart , setShoppingCart}}>
        {children}
      </CartContext.Provider>
    );
  };

  export const useCart = () : ShoppingCart => {
    const context = React.useContext(CartContext);
    if (!context) {
      throw Error('useCart must be used within an CartProvider');
    }
    return context;
  }
  