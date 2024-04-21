"use client";
import { useEffect, useState } from 'react';


const ProductDetailsPage = ({ params }: { params: { slug: string } }) => {
    const [product, setProduct] = useState<any | null>(null);
    const fetchDataProduct = async () => {
    try {
        const response = await fetch(`https://c1bb0d8a5f1d.airneis.net/api/products/slug/${params.slug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      setProduct(responseData.product);

    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  
  useEffect(() => {
    fetchDataProduct();
  });
 /**
  return (<>
  <pre>
    {JSON.stringify(product, null, 2)}
  </pre>
  </>)
*/

    return (
      <>
          {product ? (
            
            <>
      <article className="flex items-start space-x-4 content-below-navbar bg-white shadow-md p-6 rounded-lg">
        <img src={"https://c1bb0d8a5f1d.airneis.net/medias/serve/" + product.images[0].filename} alt={product.name} className="w-96 h-96 object-cover rounded-md"/>
        <div className="flex flex-col pl-12 pt-12">
         
            <h1 className="text-2xl font-bold text-sky-800">{product.name}</h1>
            <p className="mt-2 text-gray-700">{product.description}</p>
            <div className="mt-4">
                <p className="text-gray-600">{product.stock} En stock</p>
                <p className="text-gray-900 font-semibold">{product.price} €</p>
            </div>
            <button className="mt-4  px-4 btn btn-primary text-white font-bold rounded transition duration-300 ease-in-out focus:outline-none focus:shadow-outline">
                Add to Cart
            </button>
            
            
        </div>
        </article>
        </>
    
          ):(
            <section className="h-full w-full p-20 flex justify-center">
            <progress className="progress w-56 flex"></progress>
          </section>
          )}
          
    </>
    )
}

export default ProductDetailsPage;