"use client";
import { useState, useEffect } from 'react';
import Link from "next/link";
import getCallAPI from '@/API/getCallAPI';



const CategorieProductsPage = ({ params }: { params: { category : any } }) => {

    const [CategoryProducts, setCategoryProducts] = useState<any[]>([]);

    const CATEGORY_PRODUCTS_URL = `https://c1bb0d8a5f1d.airneis.net/api/products?category=${params.category.id}`;

    const fetchData = async (url: string) => {
        const response = await getCallAPI(url);
        setCategoryProducts(response.products);
    }



    useEffect(() => {
        fetchData(CATEGORY_PRODUCTS_URL);
    }, [params.category]);






    return (
        <>
            <main>
                <div className='w-full h-[500px]'>
                   
                </div>
                <div className="container m-3 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CategoryProducts ? (
              CategoryProducts.map((product, i) => (
                <div id={`category-Card${i}`} className="card w-80 bg-base-100 shadow-xl image-full pt-5" key={i}>
                  {/*<figure><img src={`https://c1bb0d8a5f1d.airneis.net/medias/serve/${category.thumbnail[0].filename}`} alt="Canapés" className="w-full h-full" /></figure>*/}
                  <div className="card-body">
                    <h2 className="card-title">{product.name}</h2>
                    <p>{product.description}</p>
                    <div className="card-actions justify-end pt-5">
                      <Link href={`/produitdetails/${product.slug}`}><button className="btn btn-primary ">Voir nos {product.name}</button></Link>
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