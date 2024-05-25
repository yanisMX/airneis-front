import { Cart,Product, ShoppingCart } from "../interfaces/interfaces";

export const handleAddToCart = (product: any, shoppingCart: Cart[]): Cart[] => {
  const updatedCart: Cart[] = [...shoppingCart];

  const existingCartItemIndex = updatedCart.findIndex(item => item.products.some(p => p.id === product.id));
  const subtotal = product.price * product.quantity;

  if (existingCartItemIndex !== -1) {
    updatedCart[existingCartItemIndex].quantity += 1;
  } else {
    updatedCart.push({
      products: [product],
      quantity: 1,
      subtotal: subtotal,
      total: subtotal.toString(),
    });
  }

  return updatedCart;
};

export const handleRemoveFromCart = (product: Product, shoppingCart: Cart[]): Cart[] => {
  const updatedCart: Cart[] = [...shoppingCart];

  const existingCartItemIndex = updatedCart.findIndex(item => item.products.some(p => p.id === product.id));

  if (existingCartItemIndex !== -1) {
    updatedCart[existingCartItemIndex].quantity -= 1;

    if (updatedCart[existingCartItemIndex].quantity === 0) {
      updatedCart.splice(existingCartItemIndex, 1);
    }
  }

  return updatedCart;
};
