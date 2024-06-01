import { Cart, Product, CartItem } from "../interfaces/interfaces";
import modifyQuantity from "../(pages)/panier/page";



export const handleAddToCart = (product: Product, shoppingCart: Cart): Cart => {
  const updatedCart : Cart = { ...shoppingCart, items : shoppingCart.items ? [...shoppingCart.items] : [], total: shoppingCart.total || 0 };
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

export const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
};



