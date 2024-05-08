"use client";
import { useState, useEffect } from 'react';
import Link from "next/link";
import getCallAPI from '@/app/API/getCallAPI';



const CategorieProductsPage = ({ params }: { params: { category : any } }) => {

    const [CategoryProducts, setCategoryProducts] = useState<any | null>(null);
    const [CategoryProductImage, setCategoryProductImage] = useState<any | null>(null);
    const CATEGORY_PRODUCTS_URL = `https://c1bb0d8a5f1d.airneis.net/api/products?category=${params.category.id}`;

    useEffect(() => {
        const fetchData = async() => {
          const response = await getCallAPI(CATEGORY_PRODUCTS_URL);
          const firstProduct = await response.products[0];
          if (firstProduct.images && firstProduct.images.length > 0) {
            setCategoryProductImage(`https://c1bb0d8a5f1d.airneis.net/medias/serve/${firstProduct.images[0].filename}`);
        } 
          setCategoryProducts(response.products)
          
        };

        fetchData();
        
    }, [params.category.id]);

    return (
        <>
            <main >
                <div className='carousel h-[500px] w-full'>
                {CategoryProductImage ? (
                    <figure className='carousel-item relative w-full'>
                        <img src={CategoryProductImage} alt={CategoryProductImage.name} className='w-full object-cover brightness-75'/>
                    </figure>
                ) : (
                    <section className="h-full w-full p-20 flex justify-center ">
                        <progress className="progress w-56 flex"></progress>
                    </section>
                )}
                </div>
                <div className="container m-3 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 content-below-navbar">
            {CategoryProducts ? (






              CategoryProducts.map((product :any, i) => (
                <div id={`category-Card${i}`} className="card w-80 bg-base-100 shadow-xl image-full pt-5" key={i}>
                  {/*<figure><img src={`https://c1bb0d8a5f1d.airneis.net/medias/serve/${product.images.filename}`} alt="Canapés" className="w-full h-full" /></figure>*/}
                  <div className="card-body">
                    <h2 className="card-title">{product.name}</h2>
                    <p>{product.description}</p>
                    <div className="card-actions justify-end pt-5">
                      <Link href={`/pages/produitdetails/${product.slug}`}><button className="btn btn-primary ">Voir nos {product.name}</button></Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (<section className="h-full w-full p-20 flex justify-center ">
              <progress className="progress w-56 flex"></progress>
            </section>)}
          </div>
        </div>

            </main>
        </>
    )



};

export default CategorieProductsPage;

/*

  */ 