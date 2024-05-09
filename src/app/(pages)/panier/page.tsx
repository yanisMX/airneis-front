"use client";
import { Product, ShoppingCart } from '@/app/interfaces/interfaces';
import React, { useState } from 'react';
import { handleAddToCart }from '@/app/utils/utils';

const CartPage = ({}) => {
  const [cart, setCart] = useState<ShoppingCart[]>([]);

  const addToCart = (product: Product) => {
    const updatedCart = handleAddToCart(cart, product);
    setCart(updatedCart);
  };
  
/*
  const productsCard = {
   
    "success": true,
    "products": [
        {
            "priority": 0,
            "id": 1,
            "name": "Table basse",
            "description": "Une incroyable table basse pour votre salon ou votre jardin qui vous coupera le soufle !",
            "slug": "f0bc0a5f-table-basse",
            "price": "20.50",
            "stock": 10,
            "createdAt": "2024-04-19T15:16:49.492Z",
            "updatedAt": "2024-04-25T07:30:43.000Z",
            "category": {
                "id": 1,
                "name": "Meubles multifonctions",
                "description": "Des meubles tout usages !",
                "createdAt": "2024-04-19T15:17:25.189Z",
                "updatedAt": "2024-04-19T15:17:25.189Z"
            },
            "materials": [
                {
                    "id": 1,
                    "name": "Acier inoxydable",
                    "createdAt": "2024-04-19T15:17:18.242Z",
                    "updatedAt": "2024-04-19T15:17:18.242Z"
                },
                {
                    "id": 2,
                    "name": "plastique",
                    "createdAt": "2024-04-19T15:17:47.422Z",
                    "updatedAt": "2024-04-19T15:17:47.422Z"
                }
            ],
            "images": [
                {
                    "id": 4,
                    "name": "logo_airneis.png",
                    "filename": "4f335202c246741fde0455b57dfe9e21",
                    "type": "image/png",
                    "size": 13172,
                    "createdAt": "2024-04-21T16:01:24.720Z",
                    "updatedAt": "2024-04-21T16:01:24.720Z"
                }
            ],
            "backgroundImage": {
                "id": 1,
                "name": "logo_airneis.png",
                "filename": "faf0f5419a279825d7cc91f2e34cc65f",
                "type": "image/png",
                "size": 13172,
                "createdAt": "2024-04-20T15:04:35.276Z",
                "updatedAt": "2024-04-20T15:04:35.276Z"
            }
        },
        {
            "priority": 0,
            "id": 2,
            "name": "Chaise",
            "description": "flemme de mettre une desc",
            "slug": "89caa6b9-chaise",
            "price": "12.00",
            "stock": 42,
            "createdAt": "2024-04-19T15:17:10.745Z",
            "updatedAt": "2024-04-25T07:30:32.000Z",
            "category": {
                "id": 2,
                "name": "Chaises",
                "description": "chaises !",
                "createdAt": "2024-04-19T15:17:34.174Z",
                "updatedAt": "2024-04-22T18:43:51.000Z"
            },
            "materials": [
                {
                    "id": 2,
                    "name": "plastique",
                    "createdAt": "2024-04-19T15:17:47.422Z",
                    "updatedAt": "2024-04-19T15:17:47.422Z"
                }
            ],
            "images": [
                {
                    "id": 4,
                    "name": "logo_airneis.png",
                    "filename": "4f335202c246741fde0455b57dfe9e21",
                    "type": "image/png",
                    "size": 13172,
                    "createdAt": "2024-04-21T16:01:24.720Z",
                    "updatedAt": "2024-04-21T16:01:24.720Z"
                }
            ],
            "backgroundImage": {
                "id": 1,
                "name": "logo_airneis.png",
                "filename": "faf0f5419a279825d7cc91f2e34cc65f",
                "type": "image/png",
                "size": 13172,
                "createdAt": "2024-04-20T15:04:35.276Z",
                "updatedAt": "2024-04-20T15:04:35.276Z"
      
}
        }
    ]};
  */



  return (
    <section className='content-below-navbar'>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

       
        <div className="mx-auto max-w-3xl">
        
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Mon panier</h1>
          </header>

          <div className="mt-8">
          <div className="mt-8">
  {cart.map((cartItem, index) => (
    <div key={index}>
      {cartItem.products.map((product, productIndex) => (
        <ul className="space-y-4 mb-3" key={productIndex}>
          <li className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80"
              alt=""
              className="size-16 rounded object-cover"
            />
            <div className="flex-1">
              <h3 className="text-sm text-gray-900">{product.name}</h3>
              <p className='text-sm'>{product.price} €</p>
            </div>

            <div className="flex flex-1 items-center justify-end gap-2">
              <form>
                <label htmlFor="Line3Qty" className="sr-only"> Quantity </label>

                <input
                  type="number"
                  min="1"
                  value={cartItem.quantity}
                  id="Line3Qty"
                  className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                />
              </form>

              <button className="text-gray-600 transition hover:text-red-600">
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
      ))}
      <p>Sous-total : €</p>
    </div>
  ))}
  <p>Total :  €</p>
</div>
           

            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
              <div className="w-screen max-w-lg space-y-4">
                <dl className="space-y-0.5 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <dt>Sous total :</dt>
                    <dd>250 €</dd>
                  </div>

                  <div className="flex justify-between !text-base font-medium">
                    <dt>Total</dt>
                    <dd>200 €</dd>
                  </div>
                </dl>

                <div className="flex justify-end">
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
}

export default CartPage;
