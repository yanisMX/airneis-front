import { ShoppingCart,Product } from "../interfaces/interfaces";

  export const handleAddToCart = (cart: ShoppingCart[], product: Product): ShoppingCart[] => {
    const newCartItem: ShoppingCart = {
      products: [product],
      quantity: 1,
    };
    return [...cart, newCartItem];
  };