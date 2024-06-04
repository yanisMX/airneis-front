'use client';
import { CartItem, Product, ShoppingCart } from '@/app/interfaces/interfaces';
import React, { useState } from 'react';
import { useCart } from '@/app/context/CartContext';
import { useAuth } from '@/app/context/AuthContext';
import Image from 'next/image';
import { calculateTotal, modifyQuantityLocally, handleRemoveProductFromCart, removeProductFromCart } from '@/app/utils/cartUtils';
import { postCallApi } from '@/app/api/post';
import { patchCallApi } from '@/app/api/patch';
import PaymentForm from '@/app/components/PaymentForm';
import CartItemComponent from '@/app/components/CartItemComponent';

const CartPage = () => {
  const ENDPOINT_TO_UPDATE_CART = '/user/basket';
  const ENDPOINT_TO_DELETE_CART = '/user/basket/clear';
  const { shoppingCart, setShoppingCart } = useCart();
  const [isBillingProcessVisible, setIsBillingProcessVisible] = useState(false);
  const { isLoggedIn, user } = useAuth();

  const modifyQuantity = async (productId: number, quantity: number) => {
    if (quantity < 1) return;

    if (!isLoggedIn || !user?.accessToken) {
      modifyQuantityLocally(productId, quantity, shoppingCart, setShoppingCart);
      return;
    }

    try {
      const data = await patchCallApi(ENDPOINT_TO_UPDATE_CART, { productId, quantity }, user.accessToken);
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

  const addQuantity = (product: Product) => {
    const currentItem = shoppingCart.items.find(
      (item: CartItem) => item.product.id === product.id
    );
    if (currentItem) {
      modifyQuantity(product.id, currentItem.quantity + 1);
    }
  };

  const subtractQuantity = (product: Product) => {
    const currentItem = shoppingCart.items.find(
      (item: CartItem) => item.product.id === product.id
    );
    if (currentItem) {
      modifyQuantity(product.id, currentItem.quantity - 1);
    }
  };

  const deleteAllItemsFromCart = async () => {
    if (isLoggedIn && user?.accessToken) {
      try {
        const response = await postCallApi(ENDPOINT_TO_DELETE_CART, user.accessToken);
        setShoppingCart({ items: [], total: 0 });
      } catch (error: any) {
        console.error(error.message);
      }
    } else {
      setShoppingCart({ items: [], total: 0 });
    }
  };


  const changePaymentFormVisibility = () => {
    console.log('changePaymentFormVisibility');
    setIsBillingProcessVisible(true);
}



  return (
    <section className="content-below-navbar min-h-screen">
        <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-50 ${isBillingProcessVisible ? 'flex' : 'hidden'} justify-center items-center`}>
        <PaymentForm
          visible={isBillingProcessVisible}
          onClose={() => setIsBillingProcessVisible(false)}
        />
      </div>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Mon panier
            </h1>
          </header>
          <div className="mt-8">
            {shoppingCart?.items?.length > 0 ? (
              <div className="mt-8">
                {shoppingCart.items.map((item, itemIndex) => (
                  <CartItemComponent
                    key={itemIndex}
                    item={item}
                    shoppingCart={shoppingCart}
                    setShoppingCart={setShoppingCart} 
                    modifyQuantity={modifyQuantity}
                    addQuantity={addQuantity}
                    subtractQuantity={subtractQuantity}
                  />
                ))}
              </div>
            ) : (
              <p className="mt-7 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded">
                Votre panier est vide
              </p>
            )}

            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
              <div className="w-screen max-w-lg space-y-4">
                <dl className="space-y-0.5 text-sm text-gray-700">
                  <div className="flex justify-between !text-base font-bold">
                    <dt>Total :</dt>
                    <dd>{shoppingCart.total} €</dd>
                  </div>
                </dl>
                <div className="flex justify-end">
                  <button onClick={deleteAllItemsFromCart}>
                    <a
                      href="#"
                      className="block rounded bg-red-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600 mx-7"
                    >
                      Supprimer mon panier
                    </a>
                  </button>
                  <button onClick={changePaymentFormVisibility}>
                  <a
                    className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                  >
                    Valider
                  </a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};



export default CartPage;
