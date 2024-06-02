import { Cart, Product, CartItem } from '../interfaces/interfaces';
import { deleteCallApi } from '@/app/api/delete';

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

export const handleRemoveFromCart = (product: Product, shoppingCart: Cart): Cart => {
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

export const handleRemoveProductFromCart = async (
  API_TO_UPDATE_CART: string,
  product: Product,
  shoppingCart: Cart,
  accessToken: string,
  setShoppingCart: (cart: Cart) => void,
) => {
  try {
    const response = await deleteCallApi(API_TO_UPDATE_CART, { productId: product.id }, accessToken);

    if (response.ok) {
      const updatedCart: Cart = {
        ...shoppingCart,
        items: shoppingCart.items.filter(
          (cartItem) => cartItem.product.id !== product.id,
        ),
      };
      
      updatedCart.total -=
        parseFloat(product.price) *
        (shoppingCart.items.find((cartItem) => cartItem.product.id === product.id)
          ?.quantity ?? 0);

      setShoppingCart(updatedCart);
    } else {
      throw new Error('Failed to remove product from cart');
    }
  } catch (error: any) {
    console.error(error.message);
  }
};

export const calculateTotal = (items: CartItem[]): number => {
  return items.reduce(
    (total, item) => total + parseFloat(item.product.price) * item.quantity,
    0,
  );
};

export const modifyQuantityLocally = (
  productId: number,
  quantity: number,
  shoppingCart: Cart,
  setShoppingCart: (cart: Cart) => void,
): void => {
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
};

export const patchCallAPIWithToken = async (
  url: string,
  data: any,
  accessToken: string,
) => {
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la connexion au serveur', error);
    return {
      success: false,
      message:
        'Problème de connexion au serveur, veuillez réessayer plus tard.',
    };
  }
};

export const modifyQuantity = async (
  productId: number,
  quantity: number,
  shoppingCart: Cart,
  setShoppingCart: (cart: Cart) => void,
  API_TO_UPDATE_CART: string,
  accessToken: string | undefined,
): Promise<void> => {
  if (quantity < 1) return;

  if (!accessToken) {
    modifyQuantityLocally(productId, quantity, shoppingCart, setShoppingCart);
    return;
  }

  try {
    const data = await patchCallAPIWithToken(API_TO_UPDATE_CART, { productId, quantity }, accessToken);
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
