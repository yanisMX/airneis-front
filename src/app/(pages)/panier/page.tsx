'use client';
import { CartItem, Product, ShoppingCart } from '@/app/interfaces/interfaces';
import React, { useState } from 'react';
import { useCart } from '@/app/context/CartContext';
import { useAuth } from '@/app/context/AuthContext';
import Image from 'next/image';
import { calculateTotal, modifyQuantityLocally, handleRemoveProductFromCart, removeProductFromCart } from '@/app/utils/cartUtils';
import { postCallApi } from '@/app/api/post';
import { patchCallApi } from '@/app/api/patch';
import Link from "next/link";

const CartPage = () => {
  const ENDPOINT_TO_UPDATE_CART = '/user/basket';
  const ENDPOINT_TO_DELETE_CART = '/user/basket/clear';

  const { shoppingCart, setShoppingCart } = useCart();
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



  return (
    <section className="content-below-navbar min-h-screen">
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
                    setShoppingCart={setShoppingCart} // Add this line
                    modifyQuantity={modifyQuantity}
                    addQuantity={addQuantity}
                    subtractQuantity={subtractQuantity}
                  />
                ))}
              </div>
            ) : (
              <p className="mt-7 py-3 px-5 font-semibold bg-blue-100 rounded-xl text-blue-700">
                <i className="fas fa-info-circle me-2"></i>
                Votre panier est vide.
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
                <div className="flex flex-col md:flex-row justify-end gap-2 pt-10">
                  <button onClick={deleteAllItemsFromCart} className="btn btn-md bg-red-500 hover:bg-red-600 text-white">
                    <i className="fas fa-trash-alt me-2"></i>
                    Supprimer mon panier
                  </button>
                  <button className="btn btn-md bg-green-600 hover:bg-green-700 text-white">
                    <i className="fas fa-shopping-cart me-2"></i>
                    Passer la commande
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

const CartItemComponent = ({
  item,
  shoppingCart,
  modifyQuantity,
  addQuantity,
  subtractQuantity,
} : {
  item: CartItem;
  shoppingCart: ShoppingCart;
  modifyQuantity: (productId: number, quantity: number) => void;
  addQuantity: (product: Product) => void;
  subtractQuantity: (product: Product) => void;
}) => {

  const ENDPOINT_TO_UPDATE_CART = '/user/basket';
  const { setShoppingCart } = useCart();
  const [quantity, setQuantity] = useState(item.quantity);
  const { user } = useAuth();


  const handleChangeQuantity = (newQuantity : number) => {
    setQuantity(newQuantity);
    modifyQuantity(item.product.id, newQuantity);
  };

  return (
    <ul className="space-y-4 mb-3">
      <li className="flex items-center gap-4">
        <Link href={`/produitdetails/${item.product.slug}`} className="flex items-center gap-4 flex-1">
          <Image
            src={item.product.images[0] ? (process.env.NEXT_PUBLIC_MEDIA_BASE_URL + "/" + item.product.images[0].filename) : (process.env.NEXT_PUBLIC_HOST + "/product-placeholder.png")}
            alt=""
            className="size-24 p-2 rounded-lg border border-gray-200 object-contain"
            width={96}
            height={96}
          />
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
            <p className="text-sm">{item.product.price} €</p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <form className="flex items-center gap-2">
            <button
              type="button"
              className="h-8 w-8 flex items-center justify-center rounded border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200"
              onClick={() => handleChangeQuantity(quantity - 1)}
            >
              -
            </button>
            <label htmlFor={`Line3Qty-${item.product.id}`} className="sr-only">
              Quantity
            </label>
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
            onClick={() =>
              removeProductFromCart(ENDPOINT_TO_UPDATE_CART, item.product, shoppingCart, user?.accessToken, setShoppingCart)
            }
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
