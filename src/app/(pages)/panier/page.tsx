"use client";
import { Product, ShoppingCart } from '@/app/interfaces/interfaces';
import React, { useState } from 'react';
import { useCart } from '@/app/context/CartContext';
import { useAuth } from '@/app/context/AuthContext';
import Image from 'next/image';
import { calculateTotal, handleRemoveFromCart } from '@/app/utils/cartUtils';

const CartPage = () => {
  const API_TO_UPDATE_CART = 'https://c1bb0d8a5f1d.airneis.net/api/user/basket';

  const { shoppingCart, setShoppingCart } = useCart();
  const { isLoggedIn, user } = useAuth();

  const modifyQuantity = async (productId: number, quantity: number) => {
    if (quantity < 1) return;
    let updatedCart;
    if (isLoggedIn && user?.accessToken) {
      try {
        const response = await fetch(API_TO_UPDATE_CART, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify({ productId, quantity }),
        });
        if (!response.ok) {
          throw new Error('Impossible de modifier la quantité du produit');
        }
        const data = await response.json();
        updatedCart = data.cart;
      } catch (error: any) {
        console.error(error.message);
      }
    } else {
      updatedCart = shoppingCart.items.map((item) => {
        if (item.product.id === productId) {
          return { ...item, quantity };
        }
        return item;
      });
      updatedCart = { items: updatedCart, total: calculateTotal(updatedCart) };
    }
    if (updatedCart) {
      setShoppingCart(updatedCart);
    }
  };

  const addQuantity = (product: Product, cart: ShoppingCart) => {
    const currentItem = cart.items.find((item) => item.product.id === product.id);
    if (currentItem) {
      modifyQuantity(product.id, currentItem.quantity + 1);
    }
  };

  const subtractQuantity = (product: Product, cart: ShoppingCart) => {
    const currentItem = cart.items.find((item) => item.product.id === product.id);
    if (currentItem) {
      modifyQuantity(product.id, currentItem.quantity - 1);
    }
  };

  const deleteAllItemsFromCart = async () => {
    if (isLoggedIn && user?.accessToken) {
      try {
        const response = await fetch(API_TO_UPDATE_CART, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.accessToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Impossible de supprimer le panier de l'utilisateur");
        }
        setShoppingCart({ items: [], total: 0 });
      } catch (error: any) {
        console.error(error.message);
      }
    } else {
      setShoppingCart({ items: [], total: 0 });
    }
  };

  return (
    <section className='content-below-navbar min-h-screen'>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Mon panier</h1>
          </header>
          <div className="mt-8">
            {shoppingCart?.items?.length > 0 ? (
              <div className="mt-8">
                {shoppingCart.items.map((item, itemIndex) => (
                  <CartItemComponent key={itemIndex} item={item} shoppingCart={shoppingCart} modifyQuantity={modifyQuantity} addQuantity={addQuantity} subtractQuantity={subtractQuantity} />
                ))}
              </div>
            ) : (
              <p className="mt-7 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded">Votre panier est vide</p>
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
                  <button
                    onClick={deleteAllItemsFromCart}
                  >
                    <a
                      href="#"
                      className="block rounded bg-red-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600 mx-7"
                    >

                      Supprimer mon panier
                    </a>
                  </button>
                  <a
                    href="#"
                    className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                  >
                    Valider
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CartItemComponent = ({ item, shoppingCart, modifyQuantity, addQuantity, subtractQuantity }) => {
  const { setShoppingCart } = useCart();
  const [quantity, setQuantity] = useState(item.quantity);

  const handleChangeQuantity = (newQuantity) => {
    setQuantity(newQuantity);
    modifyQuantity(item.product.id, newQuantity);
  };

  return (
    <ul className="space-y-4 mb-3">
      <li className="flex items-center gap-4">
        <Image
          src={`https://c1bb0d8a5f1d.airneis.net/medias/serve/${item.product.images[0].filename}`}
          alt=""
          className="size-16 rounded object-cover"
          width={40}
          height={40}
        />
        <div className="flex-1">
          <h3 className="text-sm text-gray-900">{item.product.name}</h3>
          <p className='text-sm'>{item.product.price} €</p>
        </div>
        <div className="flex flex-1 items-center justify-end gap-2">
          <form className="flex items-center gap-2">
            <button
              type="button"
              className="h-8 w-8 flex items-center justify-center rounded border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200"
              onClick={() => handleChangeQuantity(quantity - 1)}
            >
              -
            </button>
            <label htmlFor={`Line3Qty-${item.product.id}`} className="sr-only">Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              id={`Line3Qty-${item.product.id}`}
              className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 focus:outline-none"
              onChange={(e) => handleChangeQuantity(parseInt(e.target.value))}
            />
            <button
              type="button"
              className="h-8 w-8 flex items-center justify-center rounded border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200"
              onClick={() => handleChangeQuantity(quantity + 1)}
            >
              +
            </button>
          </form>
          <button
            className="text-gray-600 transition hover:text-red-600"
            onClick={() => setShoppingCart(handleRemoveFromCart(item.product, shoppingCart))}
          >
            <span className="sr-only">Remove item</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      </li>
    </ul>
  );
};

export default CartPage;
