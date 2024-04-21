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

      console.log(responseData.product);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  
  useEffect(() => {
    fetchDataProduct();
  }, []);

  return (<>
  <pre>
    {JSON.stringify(product, null, 2)}
  </pre>
  </>)

    return (
        <section className="flex items-start space-x-4 content-below-navbar bg-white shadow-md p-6 rounded-lg">
        <img src={product.backgroundImage} alt={product.name} className="w-96 h-96 object-cover rounded-md"/>
        <article className="flex flex-col">
            <h1 className="text-2xl font-bold text-sky-800">{product.name}</h1>
            <p className="mt-2 text-gray-700">{product.description}</p>
            <div className="mt-4">
                <p className="text-gray-600">{product.stock} in stock</p>
                <p className="text-gray-900 font-semibold">{product.price} €</p>
            </div>
            <button className="mt-4  px-4 btn btn-primary text-white font-bold rounded transition duration-300 ease-in-out focus:outline-none focus:shadow-outline">
                Add to Cart
            </button>
        </article>
    </section>
    )
}

export default ProductDetailsPage;