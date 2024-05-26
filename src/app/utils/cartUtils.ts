import { Cart, Product, CartItem } from "../interfaces/interfaces";



export const handleAddToCart = (product: Product, shoppingCart: Cart): Cart => {
  const updatedCart : Cart = { ...shoppingCart, items: [...shoppingCart.items]  };
  let found = false;

  updatedCart.items.forEach(item => {
    if (item.product.id === product.id) {
      item.quantity += 1;
      updatedCart.total += parseFloat(product.price);
      found = true;
    }
  });

  if (!found) {
    const newItem: CartItem = {
      product,
      quantity: 1
    };
    updatedCart.items.push(newItem);
    updatedCart.total += parseFloat(product.price);
  }

  return updatedCart;
};

export const handleRemoveFromCart = (product: Product, shoppingCart: Cart): Cart => {
  const updatedCart: Cart = { ...shoppingCart, items: [...shoppingCart.items] };

  updatedCart.items = updatedCart.items.filter(cartItem => {
    if (cartItem.product.id === product.id) {
      cartItem.quantity -= 1;
      updatedCart.total -= parseFloat(product.price);

      return cartItem.quantity > 0;
    }
    return true;
  });

  return updatedCart;
};
