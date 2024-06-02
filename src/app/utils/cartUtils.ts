import { Cart, Product, CartItem } from '../interfaces/interfaces';

export const handleAddToCart = (product: Product, shoppingCart: Cart): Cart => {
  const updatedCart: Cart = {
    ...shoppingCart,
    items: shoppingCart.items ? [...shoppingCart.items] : [],
    total: shoppingCart.total || 0,
  };
  let found = false;

  updatedCart.items.forEach((item) => {
    if (item.product.id === product.id) {
      item.quantity += 1;
      updatedCart.total += parseFloat(product.price);
      found = true;
    }
  });
  if (!found) {
    const newItem: CartItem = {
      product,
      quantity: 1,
    };
    updatedCart.items.push(newItem);
    updatedCart.total += parseFloat(product.price);
  }

  return updatedCart;
};

export const handleRemoveFromCart = (
  product: Product,
  shoppingCart: Cart,
): Cart => {
  const updatedCart: Cart = { ...shoppingCart, items: [...shoppingCart.items] };

  updatedCart.items = updatedCart.items.filter((cartItem) => {
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
  return items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
};

export const modifyQuantity = async (
  productId: number,
  quantity: number,
  shoppingCart: Cart,
  setShoppingCart: (cart: Cart) => void,
  API_TO_UPDATE_CART: string,
  accessToken: string | undefined,
): Promise<void> => {
  if (quantity < 1 || !accessToken) return;

  try {
    const response = await fetch(API_TO_UPDATE_CART, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ productId, quantity }),
    });

    if (!response.ok) {
      throw new Error('Impossible de modifier la quantité du produit');
    }

    const data = await response.json();
    if (data.success) {
      const updatedCart = shoppingCart.items.map((item) => {
        if (item.product.id === productId) {
          return { ...item, quantity };
        }
        return item;
      });

      setShoppingCart({
        items: updatedCart,
        total: calculateTotal(updatedCart),
      });
    }
  } catch (error: any) {
    console.error(error.message);
  }
};
