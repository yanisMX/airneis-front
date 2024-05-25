import { Cart, Product, CartItem } from "../interfaces/interfaces";

export const handleAddToCart = (product: Product, shoppingCart: Cart[]): Cart[] => {
  const updatedCart: Cart[] = [...shoppingCart];
  let found = false;

  updatedCart.forEach(cart => {
    const existingCartItemIndex = cart.items.findIndex(item => item.product.id === product.id);

    if (existingCartItemIndex !== -1) {
      cart.items[existingCartItemIndex].quantity += 1;
      cart.total += parseFloat(product.price);
      found = true;
    }
  });

  if (!found) {
    const newCart: Cart = {
      items: [{ product, quantity: 1 }],
      total: parseFloat(product.price), // Convert string to number
    };
    updatedCart.push(newCart);
  }

  return updatedCart;
};

export const handleRemoveFromCart = (product: Product, shoppingCart: Cart[]): Cart[] => {
  const updatedCart: Cart[] = [...shoppingCart];

  updatedCart.forEach((cart, cartIndex) => {
    const existingCartItemIndex = cart.items.findIndex(item => item.product.id === product.id);

    if (existingCartItemIndex !== -1) {
      cart.items[existingCartItemIndex].quantity -= 1;
      cart.total -= parseFloat(product.price);

      if (cart.items[existingCartItemIndex].quantity === 0) {
        cart.items.splice(existingCartItemIndex, 1);
      }

      if (cart.items.length === 0) {
        updatedCart.splice(cartIndex, 1);
      }
    }
  });

  return updatedCart;
};

