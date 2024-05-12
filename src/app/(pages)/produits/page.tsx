"use client";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import getCallAPI from "@/app/API/getCallAPI";
import { Product } from "@/app/interfaces/interfaces";
import FilterForProducts from "@/app/components/FilterForProducts";


const ProductsPage = () => {

  const [products, setProducts] = useState<Product[] | null>(null);
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
      <FilterForProducts/>
      </div>


      <div className="sm:flex flex flex-wrap ml-8">
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