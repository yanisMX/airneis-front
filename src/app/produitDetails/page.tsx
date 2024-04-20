"use client";

const ProductDetailsPage = () => {
    const product = 
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
        };

    return (
        <section className="flex items-start space-x-4 content-below-navbar bg-white shadow-md p-6 rounded-lg">
        <img src={product.background} alt={product.name} className="w-96 h-96 object-cover rounded-md"/>
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