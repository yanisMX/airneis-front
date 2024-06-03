'use client';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useEffect } from 'react';
import { getCallApi } from './api/get';
import { Product } from './interfaces/interfaces';

export default function HomePage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  const HIGHLANDERS_PRODUCTS_URL = `/products`;
  const CATEGORIES_URL = `/categories`;

  async function fetchAllData() {
    const fetchedProducts = await getCallApi(HIGHLANDERS_PRODUCTS_URL);
    const fetchedCategories = await getCallApi(CATEGORIES_URL);
    if (fetchedProducts && fetchedProducts.products) {
      setProducts(fetchedProducts.products);
    } else {
      console.error('No products found');
    }
    if (fetchedCategories && fetchedCategories.categories) {
      setCategories(fetchedCategories.categories);
    } else {
      console.error('No categories found');
    }
  }

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <>
      <Head>
        <title>Airneis</title>
        <meta
          name="description"
          content="Airneis est un fournisseur de meubles de qualité et style pour votre intérieur. Découvrez notre sélection de meubles uniques et élégants. "
        />
      </Head>

      <div className="pb-8">
        <div className="carousel w-full h-[500px]">
          {products ? (
            products.map((product: Product, i: number) => (
              <div
                id={`slide${i}`}
                key={i}
                className="carousel-item relative w-full"
              >
                <Image
                  src={process.env.NEXT_PUBLIC_MEDIA_BASE_URL + "/" + product.backgroundImage.filename}
                  alt={product.name}
                  className="w-full object-cover brightness-75"
                  layout="fill"
                />
                <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent bg-opacity-40"></div>
                <div className="absolute flex flex-col justify-end pb-16 h-full sm:mx-40">
                  <h1 className="mx-16 sm:mx-auto text-5xl font-bold text-white mb-6  sm:block">
                    {product.name}
                  </h1>
                  <p className="text-white w-4/6 hidden sm:block">
                    {product.description}
                  </p>
                  <div className=" sm:mx-auto w-full flex justify-center">
                    <Link href={`/produitdetails/${product.slug}`}>
                      <button className="btn btn-primary">
                        Voir le produit
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a
                    href={`#slide${i === 0 ? products.length - 1 : i - 1}`}
                    className="btn btn-circle bg-black hover:bg-white bg-opacity-50 hover:bg-opacity-25 backdrop-filter backdrop-blur border-none text-white ms-4"
                  >
                    ❮
                  </a>
                  <a
                    href={`#slide${i === products.length - 1 ? 0 : i + 1}`}
                    className="btn btn-circle bg-black hover:bg-white bg-opacity-50 hover:bg-opacity-25 backdrop-filter backdrop-blur border-none text-white me-4"
                  >
                    ❯
                  </a>
                </div>
              </div>
            ))
          ) : (
            <section className="h-full w-full p-20 flex justify-center ">
              ddsf
            </section>
          )}
        </div>

        <div className="container m-3 mb-12">
          <h1 className="text-4xl font-bold text-center pb-3">
            Venant des hautes terres d&apos;Ecosse, <br /> nos meubles sont
            immortels 🛋️
          </h1>
          <div className="flex overflow-x-scroll space-x-6">
  {categories ? (
    categories.map((category, id: number) => (
      <div
        id={`category-Card${id}`}
        className="card w-80 bg-base-100 shadow-xl image-full flex-none"
        key={id}
      >
        {category.thumbnail && (
          <figure>
            <Image
              src={process.env.NEXT_PUBLIC_MEDIA_BASE_URL + "/" + category.thumbnail.filename}
              alt="Canapés"
              className="w-full h-full"
              layout="fill"
            />
          </figure>
        )}
        <div className="card-body">
          <h2 className="card-title">{category.name}</h2>
          <p>{category.description}</p>
          <div className="card-actions justify-end pt-5">
            <Link href={`/categorie/` + category.name}>
              <button className="btn btn-primary ">
                Voir nos {category.name}
              </button>
            </Link>
          </div>
        </div>
      </div>
    ))
  ) : (
    <section className="h-full w-full p-20 flex justify-center ">
      <progress className="progress w-56 flex"></progress>
    </section>
  )}
</div>

        </div>
      </div>
    </>
  );
}
