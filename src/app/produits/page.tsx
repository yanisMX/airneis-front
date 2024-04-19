"use client";
import { response } from "express";
import {use, useState} from "react";
import {useEffect} from "react";

const Produits = () => {  
        
  const [products, setProducts] = useState<any[] | null>(null);

  useEffect(() => {
    (async () => {
      const responseAPI = await fetch(
        "https://c1bb0d8a5f1d.airneis.net/api/products"
      );
      const responseAPIData = await responseAPI.json();
      setProducts(responseAPIData);
    })();
  }, []);
    
    return (

        <section className="content-below-navbar">
            {products ? (products.map((product, i) => {
                return(
                    <article className="pt-6 pb-8" key={i}>
                    <div className="card w-80 bg-base-100 shadow-xl">
                    <figure><img src={product.images} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{product.name}</h2>
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                        <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                    </div>
                    </article>
                )
            })):(<p className="content-below-navbar">Erreur de chargement</p>)}
           
        </section>
    );
}

export default Produits;