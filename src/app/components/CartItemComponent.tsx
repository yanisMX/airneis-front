"use client";
import { CartItem, Product, ShoppingCart } from '@/app/interfaces/interfaces';
import { useCart } from '@/app/context/CartContext';
import { useAuth } from '@/app/context/AuthContext';
import Image from 'next/image';
import { removeProductFromCart } from '@/app/utils/cartUtils';
import { useState } from 'react';


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
          <Image
            src={`https://c1bb0d8a5f1d.airneis.net/medias/serve/${item.product.images[0].filename}`}
            alt=""
            className="size-16 rounded object-cover"
            width={40}
            height={40}
          />
          <div className="flex-1">
            <h3 className="text-sm text-gray-900">{item.product.name}</h3>
            <p className="text-sm">{item.product.price} €</p>
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
  
export default CartItemComponent;