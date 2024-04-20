"use client";
import { response } from "express";
import {use, useState} from "react";
import {useEffect} from "react";
import Image from 'next/image';
import Link from "next/link";
const ProductsPage = () => {  
/*
  const [products, setProducts] = useState<any[] | null>(null);



  const fetchDataProducts = async () => {
  try {
    const response = await fetch('/api/products', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseData = await response.json();
    setProducts(responseData.products); // Mise à jour de l'état ici
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

useEffect(() => {
  fetchDataProducts();
}, []);

  
 */
const products = [
  {
    id: 1,
    name: "Chaise en bois MAHOGANY",
    description: "Une belle chaise en bois pour votre salon, votre cuisine ou votre jardin. Elle est très confortable et très solide. D'un design simple et épuré, elle s'adaptera à tous les styles de décoration.",
    price: "12.00",
    stock: 3,
    createdAt: "2024-04-03T12:06:40.121Z",
    updatedAt: "2024-04-03T12:06:40.121Z",
    category: null,
    images: [],
    background: "https://daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg"
  },
  {
    id: 2,
    name: "Table en bois SHERWOOD",
    description: "Cette table en bois est parfaite pour votre salon. D'une élégance rare, elle apportera une touche de modernité à votre intérieur, tout en mêlant le charme du bois à la chaleur de la couleur.",
    price: "25.00",
    stock: 3,
    createdAt: "2024-04-03T12:06:40.121Z",
    updatedAt: "2024-04-03T12:06:40.121Z",
    category: null,
    images: [],
    background: "https://daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg"
  },
  {
    id: 3,
    name: "Tapis en laine KASHMIR",
    description: "Ce tapis en laine est un véritable bijou pour votre salon. Il est très doux et très confortable, et sa couleur chaude apportera une touche de chaleur à votre intérieur. Il est parfait pour les soirées d'hiver, pour se blottir devant la cheminée.",
    price: "24.50",
    stock: 3,
    createdAt: "2024-04-03T12:06:40.121Z",
    updatedAt: "2024-04-03T12:06:40.121Z",
    category: null,
    images: [],
    background: "https://daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
  }
];
    
  return (
    <section className="content-below-navbar">
      <div className="flex flex-row flex-wrap space-between gap-3">
        {products ? (
          products.map((product, i) => (
            <article className="p-6" key={i}>
              <div className="card w-60 bg-base-100 shadow-xl flex flex-col justify-between">
                <figure className="w-60 h-20">
                  <img src={product.background} alt={product.name}/>
                </figure>
                <div className="card-body flex flex-col">
                  <h2 className="card-title">{product.name}</h2>
                  <p className="text-ellipsis overflow-hidden" style={{ maxHeight: '4.5em' }}>{product.description}</p>
                  
                  <div className="card-actions space-between pt-4">
                  <p className="mt-auto pb-2.5">{product.price} €</p>
                    <button className="btn btn-primary">
                      <a href="/produitDetails">Buy Now</a>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))
        ):(<section className="h-full w-full p-20 flex justify-center ">
          <progress className="progress w-56 flex"></progress>
        </section>)}
           </div>
        </section>
    );
}

export default ProductsPage;