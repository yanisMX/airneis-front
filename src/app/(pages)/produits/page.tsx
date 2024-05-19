"use client";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import getCallAPI from "@/app/API/getCallAPI";
import { Product } from "@/app/interfaces/interfaces";
import FilterForProducts from "@/app/components/FilterForProducts";
import ProductComponent from "@/app/components/ProductComponent";


const ProductsPage = () => {

  const [products, setProducts] = useState<Product[] | null>(null);
  const API_FOR_ALL_PRODUCTS = 'https://c1bb0d8a5f1d.airneis.net/api/products';
  
  const fetchDataProducts = async() => {
    const response = await getCallAPI(API_FOR_ALL_PRODUCTS);
    setProducts(response.products);
  }
  ;
  useEffect(() => {
    fetchDataProducts();
  }, []);

  return (
    <>
   
      <main className="flex content-below-navbar">
      <div className="w-80 p-3">
      <FilterForProducts/>
      </div>


      <div className="sm:flex flex flex-wrap ml-8">
        {products ? (
          products.map((product, i) => (
           <ProductComponent  product={product} i={i} key={i}/>
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