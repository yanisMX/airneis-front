'use client';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useEffect } from 'react';
import { getCallApi } from './api/get';
import { Product } from './interfaces/interfaces';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  const HIGHLANDERS_PRODUCTS_URL = `/products?featured=1`;

  async function fetchAllData() {
    const fetchedProducts = await getCallApi(HIGHLANDERS_PRODUCTS_URL);
    if (fetchedProducts && fetchedProducts.products) {
      setFeaturedProducts(fetchedProducts.products);
    } else {
      console.error('No products found');
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
        <div className="carousel w-full h-[700px]">
          {featuredProducts ? (
            featuredProducts.map((product: Product, i: number) => (
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
                <div className="absolute flex flex-col justify-end pb-16 w-full h-full px-20 md:px-40">
                  <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 sm:block">
                    {product.name}
                  </h1>
                  <p className="text-white mb-6 w-full">
                    {product.description.split(" ").slice(0, 35).join(" ")}...
                  </p>
                  <div>
                    <Link href={`/produitdetails/${product.slug}`}>
                      <button className="btn btn-sm btn-primary">
                        Voir le produit
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a
                    href={`#slide${i === 0 ? featuredProducts.length - 1 : i - 1}`}
                    className="btn btn-circle bg-black hover:bg-white bg-opacity-50 hover:bg-opacity-25 backdrop-filter backdrop-blur border-none text-white ms-4"
                  >
                    ❮
                  </a>
                  <a
                    href={`#slide${i === featuredProducts.length - 1 ? 0 : i + 1}`}
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

        <div className="container mx-auto my-12">
          <h1 className="text-4xl font-bold text-center mb-12">
            Venant des hautes terres d&apos;Ecosse, nos meubles sont immortels 🛋️
          </h1>
          <div className="flex overflow-x-auto pb-4 space-x-6">
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 w-full mx-6'>
              {
                featuredProducts.map((product, i) => (<>
                  <div className='relative w-full bg-red-50 aspect-square rounded-2xl overflow-hidden border border-gray-300 shadow-md'>
                    <Image
                      src={process.env.NEXT_PUBLIC_MEDIA_BASE_URL + "/" + product.images[0].filename}
                      width={300}
                      height={300}
                      alt={product.name}
                      className='w-full h-full object-cover'
                    />

                    <div className='absolute left-0 top-0 text-xl m-4 p-2 bg-black bg-opacity-40 rounded-lg text-white'>
                      {product.name}
                    </div>

                    <div className='absolute left-4 bottom-4'>
                      <Link href={`/produitdetails/${product.slug}`} className='btn btn-sm border-gray-300'>
                        Voir le produit
                      </Link>
                    </div>
                  </div>
                </>))
              }
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
