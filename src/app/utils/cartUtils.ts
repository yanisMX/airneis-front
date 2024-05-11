import { Cart,Product, ShoppingCart } from "../interfaces/interfaces";

export const handleAddToCart = (product: Product, shoppingCart: Cart[]): Cart[] => {
  const updatedCart: Cart[] = [...shoppingCart];

  const existingCartItemIndex = updatedCart.findIndex(item => item.products.some(p => p.id === product.id));

  if (existingCartItemIndex !== -1) {
    updatedCart[existingCartItemIndex].quantity += 1;
  } else {
    updatedCart.push({
      products: [product],
      quantity: 1,
      subtotal: undefined,
      total: undefined
    });
  }

  return updatedCart;
};
