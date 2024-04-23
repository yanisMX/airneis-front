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
    <section className="content-below-navbar flex-2 min-h-screen">
    <div className="flex flex-row flex-wrap gap-3">


    <details open className="m-2 max-w-md w-64 overflow-hidden rounded-lg border border-gray-200 open:shadow-lg text-gray-700">
      <summary className="flex cursor-pointer select-none items-center justify-between bg-gray-100 px-5 py-3 lg:hidden">
        <span className="text-sm font-medium">Toggle Filters</span>
        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </summary>

      <form className="border-t border-gray-200 lg:border-t-0">
        <fieldset className="w-full">
          <legend className="block w-full bg-gray-50 px-5 py-3 text-xs font-medium">Type</legend>
          <div className="space-y-2 px-5 py-6">
            <div className="flex items-center">
              <input id="New" type="checkbox" name="type[New]" className="h-5 w-5 rounded border-gray-300" defaultChecked />
              <label htmlFor="New" className="ml-3 text-sm font-medium">New</label>
            </div>
            <div className="flex items-center">
              <input id="Used" type="checkbox" name="type[Used]" className="h-5 w-5 rounded border-gray-300" />
              <label htmlFor="Used" className="ml-3 text-sm font-medium">Used</label>
            </div>
            <div className="flex items-center">
              <input id="Branded" type="checkbox" name="type[Branded]" className="h-5 w-5 rounded border-gray-300" />
              <label htmlFor="Branded" className="ml-3 text-sm font-medium">Branded</label>
            </div>
            <div className="pt-2">
              <button type="button" className="text-xs text-gray-500 underline">Reset Type</button>
            </div>
          </div>
        </fieldset>

        <fieldset className="w-full">
          <legend className="block w-full bg-gray-50 px-5 py-3 text-xs font-medium">Prix</legend>
          <div className="space-y-2 px-5 py-6">
            <div className="flex items-center">
              <input id="300+" type="radio" name="Price" value="300+" className="h-5 w-5 rounded border-gray-300" />
              <label htmlFor="300+" className="ml-3 text-sm font-medium">300+</label>
            </div>
            <div className="flex items-center">
              <input id="600+" type="radio" name="Price" value="600+" className="h-5 w-5 rounded border-gray-300" />
              <label htmlFor="600+" className="ml-3 text-sm font-medium">600+</label>
            </div>
            <div className="flex items-center">
              <input id="1500+" type="radio" name="Price" value="1500+" className="h-5 w-5 rounded border-gray-300" defaultChecked />
              <label htmlFor="1500+" className="ml-3 text-sm font-medium">1500+</label>
            </div>
            <div className="pt-2">
              <button type="button" className="text-xs text-gray-500 underline">Reset Price</button>
            </div>
          </div>
        </fieldset>
      </form>
      <div className="flex justify-between border-t border-gray-200 px-5 py-3">
        <button name="reset" type="button" className="rounded text-xs font-medium text-gray-600 underline">Reset All</button>
        <button name="commit" type="button" className="rounded bg-blue-600 px-5 py-3 text-xs font-medium text-white active:scale-95">Apply Filters</button>
      </div>
    </details>

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