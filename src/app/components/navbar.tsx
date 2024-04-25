"use client";
import Link from 'next/link';
import { useState } from 'react'; 
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'



const Navbar = () => {
  // TODO: Implement authentication
  const isLoggedIn = true;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState<any[] | null>(null);

  const fetchCategory = async () => {
    try {
      const response = await fetch(`https://c1bb0d8a5f1d.airneis.net/api/products/?categories=`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      setCategory(responseData.categories);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  });




  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="fixed w-full z-10">
        <div className="navbar bg-base-100 shadow rounded-2xl mt-8 w-5/6 md:w-4/6 lg:w-3/5 mx-auto">
          <div className="flex-1">
            <Link href="/" className="btn btn-ghost text-xl">
            
                <img src="/favicon.ico" alt="Airneis" className="w-10 h-10 me-2"/>
                Airneis
              
            </Link>
            


               <button className="sm:hidden btn btn-ghost text-xl" onClick={handleClick}>
              <i className="fa-solid fa-bars"></i>
            </button>
            
             {isOpen && (
              <div className="flex flex-col items-start sm:hidden">
                <Link href="/categories" className="hover:text-gray-400">Catégories</Link>
                <Link href="/produits" className="hover:text-gray-400">Produits</Link>
                <Link href="/rechercher" className="hover:text-gray-400">Rechercher</Link>
                <Link href="/panier" className="hover:text-gray-400">Panier</Link>
                {isLoggedIn ? (
                  <>
                    <Link href="/mon-compte" className="hover:text-gray-400">Mon compte</Link>
                    <Link href="/commandes" className="hover:text-gray-400">Commandes</Link>
                    <Link href="/deconnexion" className="hover:text-gray-400">Déconnexion</Link>
                  </>
                ) : (
                  <>
                    <Link href="/connexion" className="hover:text-gray-400">Connexion</Link>
                    <Link href="/inscription" className="hover:text-gray-400">Inscription</Link>
                  </>
                )}
              </div>
            )}
            

            <div className="dropdown dropdown-bottom ">
              <button tabIndex={0} role="button" className="btn btn-ghost" onClick={() => router.push(`/categorie`)}>
                
                Catégories
              </button>
            </div>
            <Link role="button" className="btn btn-ghost" href="/produits">
              Produits
            </Link>

          </div>
          
          <div className="flex-none">
            <Link role="button" className="btn btn-ghost rounded-full" href="/rechercher">
              <i className="fa-solid fa-magnifying-glass text-xl ms-1"></i>
            </Link>

            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle flex flex-col justify-center">
                <div className="indicator">
                  <i className="fa-solid fa-cart-shopping text-xl"></i>
                  <span className="badge badge-sm indicator-item">8</span>
                </div>
              </div>
              <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                <div className="card-body">
                  <span className="font-bold text-lg">8 Items</span>
                  <span className="text-info">Subtotal: $999</span>
                  <div className="card-actions">
                  <Link href="/panier"> <button className="btn btn-primary btn-block">View cart</button></Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar flex flex-col justify-center">
                <i className="fas fa-circle-user text-2xl"></i>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                {isLoggedIn ? (
                  <>
                    <li><a>Mon compte</a></li>
                    <li><a>Commandes</a></li>
                    <li><a>Se déconnecter</a></li>
                  </>
                ) : (
                  <>
                    <li><a>Connexion</a></li>
                    <li><a>Inscription</a></li>
                  </>
                )}
              </ul>
            </div>
          </div>
          </div>
        </div>
      
    </>
  );
}

export default Navbar;