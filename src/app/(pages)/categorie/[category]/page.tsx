'use client';
import { useState, useEffect } from 'react';
import { getCallAPI } from '@/app/api/getCallAPI';
import { Product } from '@/app/interfaces/interfaces';
import Image from 'next/image';
import ProductComponent from '@/app/components/ProductComponent';

const CategorieProductsPage = ({ params }: { params: { category: any } }) => {
  const [CategoryProducts, setCategoryProducts] = useState<Product[] | null>(
    null,
  );
  const [CategoryProductImage, setCategoryProductImage] = useState<any | null>(
    null,
  );
  const CATEGORY_PRODUCTS_URL = `https://c1bb0d8a5f1d.airneis.net/api/products?category=${params.category.id}`;

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCallAPI(CATEGORY_PRODUCTS_URL);
      const firstProduct = await response.products[0];
      if (firstProduct.images && firstProduct.images.length > 0) {
        setCategoryProductImage(
          `https://c1bb0d8a5f1d.airneis.net/medias/serve/${firstProduct.images[0].filename}`,
        );
      }
      setCategoryProducts(response.products);
    };

    fetchData();
  }, [CATEGORY_PRODUCTS_URL, params.category.id]);

  return (
    <>
      <main>
        <div className="carousel h-[500px] w-full">
          {CategoryProductImage ? (
            <figure className="carousel-item relative w-full">
              <Image
                src={CategoryProductImage}
                alt={CategoryProductImage.name}
                className="w-full object-cover brightness-75"
                layout="fill"
              />
            </figure>
          ) : (
            <section className="h-full w-full p-20 flex justify-center ">
              <progress className="progress w-56 flex"></progress>
            </section>
          )}
        </div>
        <div className="container m-3 mb-12">
          <div className="sm:flex flex flex-wrap ml-">
            {CategoryProducts ? (
              CategoryProducts.map((product: Product, i: number) => (
                <ProductComponent product={product} key={i} i={i} />
              ))
            ) : (
              <section className="h-full w-full p-20 flex justify-center ">
                <progress className="progress w-56 flex"></progress>
              </section>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default CategorieProductsPage;

/*

  */
