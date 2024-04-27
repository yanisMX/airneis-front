"use client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";
import { useEffect } from "react";


export default function HomePage() {

  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  const HIGHLANDERS_PRODUCTS_URL = 'https://c1bb0d8a5f1d.airneis.net/api/products';
  const CATEGORIES_URL = 'https://c1bb0d8a5f1d.airneis.net/api/categories';

  const fetchData = async (url: string) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      return await response.json();
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }

  }

  async function fetchAllData() {
    const fetchedProducts = await fetchData(HIGHLANDERS_PRODUCTS_URL);
    const fetchedCategories = await fetchData(CATEGORIES_URL);
    if (fetchedProducts && fetchedProducts.products) {
      setProducts(fetchedProducts.products);
    } else {
      console.error("No products found");
    }
    if (fetchedCategories && fetchedCategories.categories) {
      setCategories(fetchedCategories.categories);
    } else {
      console.error("No categories found");
    }
  }
  

  useEffect(() => {
    fetchAllData();

  });

  return (
    <>
      <Head>
        <title>Airneis</title>
        <meta name="description" content="Airneis est un fournisseur de meubles de qualité et style pour votre intérieur. Découvrez notre sélection de meubles uniques et élégants. " />
      </Head>

      <div className="pb-8">
        <div className="carousel w-full h-[500px]" >
          { products ? (
          products.map((product, i) => (
            <div id={`slide${i}`} key={i} className="carousel-item relative w-full">
              <img src={`https://c1bb0d8a5f1d.airneis.net/medias/serve/${product.images[0].filename}`} alt={product.name} className="w-full object-cover brightness-75" />
              <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent bg-opacity-40"></div>
              <div className="absolute flex flex-col justify-end pb-16 h-full mx-40">
                <h1 className="text-5xl font-bold text-white mb-6">{product.name}</h1>
                <p className="text-white w-4/6">{product.description}</p>
                <div className="mt-16">
                  <Link href={`/produitdetails/${product.slug}`}><button className="btn btn-primary">Voir le produit</button></Link>
                </div>
              </div>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href={`#slide${i === 0 ? products.length - 1 : i - 1}`} className="btn btn-circle bg-black hover:bg-white bg-opacity-50 hover:bg-opacity-25 backdrop-filter backdrop-blur border-none text-white ms-4">❮</a>
                <a href={`#slide${i === products.length - 1 ? 0 : i + 1}`} className="btn btn-circle bg-black hover:bg-white bg-opacity-50 hover:bg-opacity-25 backdrop-filter backdrop-blur border-none text-white me-4">❯</a>
              </div>
            </div>
          ))):( <section className="h-full w-full p-20 flex justify-center ">ddsf</section>)}
        </div>

        <div className="container m-3 mb-12">
          <h1 className="text-4xl font-bold text-center pb-3">Venant des hautes terres d&apos;Ecosse, <br /> nos meubles sont immortels 🛋️</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories ? (
              categories.map((category, i) => (
                <div id={`category-Card${i}`} className="card w-80 bg-base-100 shadow-xl image-full pt-5" key={i}>
                  {/*<figure><img src={`https://c1bb0d8a5f1d.airneis.net/medias/serve/${category.thumbnail[0].filename}`} alt="Canapés" className="w-full h-full" /></figure>*/}
                  <div className="card-body">
                    <h2 className="card-title">{category.name}</h2>
                    <p>{category.description}</p>
                    <div className="card-actions justify-end pt-5">
                      <Link href={`/categorie/`+ category.name}><button className="btn btn-primary ">Voir nos {category.name}</button></Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (<section className="h-full w-full p-20 flex justify-center ">
              <progress className="progress w-56 flex"></progress>
            </section>)}
          </div>
        </div>
      </div>

    </>
  );
}

