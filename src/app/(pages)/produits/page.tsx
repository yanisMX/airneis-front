"use client";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import getCallAPI from "@/app/API/getCallAPI";


const ProductsPage = () => {

  const [products, setProducts] = useState<any[] | null>(null);
  const router = useRouter();
  const API_FOR_ALL_PRODUCTS = 'https://c1bb0d8a5f1d.airneis.net/api/products';
  
  const fetchDataProducts = async() => {
    const response = await getCallAPI(API_FOR_ALL_PRODUCTS);
    setProducts(response.products);
  }
  ;
  useEffect(() => {
    fetchDataProducts();
  });

  return (
    <>
   
      <main className="flex content-below-navbar">
        
      <div className="w-80 p-3">
 
        <div className="space-y-2">
        <details
            className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary
              className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
            >
              <span className="text-sm font-medium"> Catégories </span>

              <span className="transition group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </span>
            </summary>

            <div className="border-t border-gray-200 bg-white">
              <header className="flex items-center justify-between p-4">
                <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
                Réinitialiser
                </button>
              </header>

              <ul className="space-y-1 border-t border-gray-200 p-4">
                <li>
                  <label htmlFor="FilterInStock" className="inline-flex items-center gap-2">
                    <input type="checkbox" id="FilterInStock" className="size-5 rounded border-gray-300" />

                    <span className="text-sm font-medium text-gray-700"> En stock </span>
                  </label>
                </li>
              </ul>
            </div>
          </details>
          
          <details
            className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary
              className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
            >
              <span className="text-sm font-medium"> Disponibilité </span>

              <span className="transition group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </span>
            </summary>

            <div className="border-t border-gray-200 bg-white">
              <header className="flex items-center justify-between p-4">
                <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
                Réinitialiser
                </button>
              </header>

              <ul className="space-y-1 border-t border-gray-200 p-4">
                <li>
                  <label htmlFor="FilterInStock" className="inline-flex items-center gap-2">
                    <input type="checkbox" id="FilterInStock" className="size-5 rounded border-gray-300" />

                    <span className="text-sm font-medium text-gray-700"> En stock </span>
                  </label>
                </li>
              </ul>
            </div>
          </details>

          <details
            className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary
              className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
            >
              <span className="text-sm font-medium"> Prix </span>

              <span className="transition group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </span>
            </summary>

            <div className="border-t border-gray-200 bg-white">
              <header className="flex items-center justify-between p-4">
                <span className="text-sm text-gray-700">Le prix le plus chère est de 500€ </span>

                <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
                  Réinitialiser
                </button>
              </header>

              <div className="border-t border-gray-200 p-4">
                <div className="flex justify-between gap-4">
                  <label htmlFor="FilterPriceFrom" className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">€</span>

                    <input
                      type="number"
                      id="FilterPriceFrom"
                      placeholder="De"
                      className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    />
                  </label>

                  <label htmlFor="FilterPriceTo" className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">€</span>

                    <input
                      type="number"
                      id="FilterPriceTo"
                      placeholder="à"
                      className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    />
                  </label>
                </div>
              </div>
            </div>
          </details>
        </div>
      </div>


      <div className="sm:flex">
        {products ? (
          products.map((product, i) => (
            <article className="p-6 sm:flex-row-reverse" key={i}>
              <div className="card w-60 h-96 bg-base-100 shadow-xl flex flex-col "> {/* Hauteur fixe ajoutée ici */}
                <figure className="w-60 h-20">
                  <img src={`https://c1bb0d8a5f1d.airneis.net/medias/serve/${product.images[0].filename}`} alt={product.name} />
                </figure>
                <div className="card-body flex flex-col">
                  <h2 className="card-title">{product.name}</h2>
                  <p className="text-ellipsis overflow-hidden" style={{ maxHeight: '4.5em', overflow: 'hidden' }}>{product.description}</p>

                  <div className="card-actions space-between pt-4 flex-grow">
                    <p className="mt-auto pb-2.5">{product.price} €</p>
                    <button className="btn btn-primary mt-auto" onClick={() => router.push(`/produitdetails/${product.slug}`)}>
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))
        ) : (
          <section className="content-below-navbar flex-1 min-h-screen">

            <div className="flex flex-col gap-4 w-52 ">
              <div className="skeleton h-32 w-full"></div>
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>

            </div>
          </section>
        )}
      </div>
      </main>
    </>
  );
}

export default ProductsPage;