import Head from "next/head";
import Footer from "./components/footer";

export default function HomePage() {
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
    <>
      <Head>
        <title>Airneis</title>
        <meta name="description" content="Airneis est un fournisseur de meubles de qualité et style pour votre intérieur. Découvrez notre sélection de meubles uniques et élégants. " />
      </Head>

      <div className="h-screen pb-8 ">
        <div className="carousel w-full h-3/5">
          {products.map((product, i) => (
            <div id={`slide${i}`} key={i} className="carousel-item relative w-full">
              <img src={product.background} alt={product.name} className="w-full object-cover brightness-75" />
              <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent bg-opacity-40"></div>
              <div className="absolute flex flex-col justify-end pb-16 h-full mx-40">
                <h1 className="text-5xl font-bold text-white mb-6">{product.name}</h1>
                <p className="text-white w-4/6">{product.description}</p>
                <div className="mt-16">
                  <button className="btn btn-primary">Voir le produit</button>
                </div>
              </div>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href={`#slide${i === 0 ? products.length - 1 : i - 1}`} className="btn btn-circle bg-black hover:bg-white bg-opacity-50 hover:bg-opacity-25 backdrop-filter backdrop-blur border-none text-white ms-4">❮</a>
                <a href={`#slide${i === products.length - 1 ? 0 : i + 1}`} className="btn btn-circle bg-black hover:bg-white bg-opacity-50 hover:bg-opacity-25 backdrop-filter backdrop-blur border-none text-white me-4">❯</a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="container m-3">
          <h1 className="text-4xl font-bold text-center">Venant des hautes terres d'Ecosse, <br/> nos meubles sont immortels</h1>
          <div className="container flex justify-between">
            {products ? (
              products.map((product, i) => (
                <div id={`category-Card${i}`} className="card w-80 bg-base-100 shadow-xl image-full pt-5" key={i}>
                  <figure><img src={product.background} alt="Canapés" /></figure>
                  <div className="card-body">
                    <h2 className="card-title">{product.name}</h2>
                    <p>{product.description}</p>
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary">Buy Now</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (<p>Erreur de chargement</p>)}
          </div>
        </div>
      </div>
      
    
    </>
  );
}

