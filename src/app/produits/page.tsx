"use client";
import {useState} from "react";
import {useEffect} from "react";
import { useRouter } from 'next/navigation'

const ProductsPage = () => {  

  const [products, setProducts] = useState<any[] | null>(null);
  const router = useRouter();
  const fetchDataProducts = async () => {
  try {
    const response = await fetch('https://c1bb0d8a5f1d.airneis.net/api/products', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseData = await response.json();
    setProducts(responseData.products);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};


useEffect(() => {
  fetchDataProducts();
});
    
  return (
    <section className="content-below-navbar flex-1 min-h-screen">
    <div className="flex flex-row flex-wrap gap-3">
      {products ? (
        products.map((product, i) => (
          <article className="p-6" key={i}>
            <div className="card w-60 h-96 bg-base-100 shadow-xl flex flex-col "> {/* Hauteur fixe ajoutée ici */}
              <figure className="w-60 h-20">
                <img src={"https://c1bb0d8a5f1d.airneis.net/medias/serve/" + product.images[0].filename} alt={product.name}/>
              </figure>
              <div className="card-body flex flex-col">
                <h2 className="card-title">{product.name}</h2>
                <p className="text-ellipsis overflow-hidden" style={{ maxHeight: '4.5em', overflow: 'hidden' }}>{product.description}</p>
                
                <div className="card-actions space-between pt-4 flex-grow"> 
                  <p className="mt-auto pb-2.5">{product.price} €</p>
                  <button className="btn btn-primary mt-auto" onClick={() => router.push(`/produitdetails/${product.slug}`)}>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))
      ) : (
        <section className="content-below-navbar flex-1 min-h-screen">
        
        <div className="flex flex-col gap-4 w-52 ">
  <div className="skeleton h-32 w-full"></div>
  <div className="skeleton h-4 w-28"></div>
  <div className="skeleton h-4 w-full"></div>
  <div className="skeleton h-4 w-full"></div>

</div>
</section>
      )}
    </div>
  </section>
  
    );
}

export default ProductsPage;