"use client";
import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { useCart } from '@/app/context/CartContext';
import postCallAPILogout from '../api/postCallAPILogout';
import Image from 'next/image';

const Navbar = () => {

  const API_FOR_LOGOUT = 'https://c1bb0d8a5f1d.airneis.net/api/auth/logout'

  const { isLoggedIn, logout } = useAuth();
  const { shoppingCart } = useCart();


  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleClickForLogout = async () => {

    const result = await postCallAPILogout(API_FOR_LOGOUT);
    if (result.success) {
      logout();
      
    }
  }

  const handleClick = ()=> {
    setIsOpen(!isOpen);
  };

  const quantity = shoppingCart?.items?.reduce((acc, cartItem) => {
    return acc + cartItem.quantity;
  }, 0) || 0;

  const getArticleCount = shoppingCart?.items?.map((cartItem) => {
    if (cartItem.quantity === 0) {
      return cartItem.quantity;
    }
    const articleCountText = cartItem.quantity === 1 ? 'article' : 'articles';
    return `${cartItem.quantity} ${articleCountText}`;
  }) || [];

  const total = shoppingCart.total;


  return (
    <>
      <div className="fixed w-full z-10">
        <div className="navbar bg-base-100 shadow rounded-2xl mt-8 w-5/6 md:w-4/6 lg:w-3/5 mx-auto">
          <div className="flex-1">
            <Link href="/" className="btn btn-ghost text-xl flex items-center">
              <Image
                src="/favicon.ico"
                alt="Airneis"
                width={40}
                height={40}
                className="me-2"
              />
              <span>Airneis</span>
            </Link>
            <button className="sm:hidden btn btn-ghost text-xl flex-1 ml-8" onClick={handleClick}>
              <i className="fa-solid fa-bars"></i>
            </button>
            {isOpen && (
              <div className="absolute top-full right-0 mr-8 bg-white shadow-lg rounded-lg p-4 flex flex-col items-start sm:hidden z-50">                <Link href="/produits" className="hover:text-gray-400">Produits</Link>
                <Link href="/rechercher" className="hover:text-gray-400 hover:font-bold">Rechercher</Link>
                <Link href="/panier" className="hover:text-gray-400 hover:font-bold">Panier</Link>
                {isLoggedIn ? ( 
                  <>
                    <Link href="/mon-compte" className="hover:text-gray-400 hover:font-bold">Mon compte</Link>
                    <Link href="/commandes" className="hover:text-gray-400 hover:font-bold">Commandes</Link>
                    <Link href="/deconnexion" className="hover:text-gray-400 hover:font-bold">Déconnexion</Link>
                  </>
                ) : (
                  <>
                    <Link href="/connexion" className="hover:text-gray-400 hover:font-bold">Connexion</Link>
                    <Link href="/inscription" className="hover:text-gray-400 hover:font-bold">Inscription</Link>
                  </>
                )}
              </div>
            )}


            
            <Link role="button" className="sm:btn sm:btn-ghost hidden sm:hover:font-bold" href="/produits">
              Produits
            </Link>

          </div>

            <div className='hidden sm:block'>
          <div className="flex-none">
            <Link role="button" className="btn btn-ghost rounded-full" href="/rechercher">
              <i className="fa-solid fa-magnifying-glass text-xl ms-1"></i>
            </Link>

            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle flex flex-col justify-center">
                <div className="indicator">
                  <i className="fa-solid fa-cart-shopping text-xl"></i>
                  <span className="badge badge-sm indicator-item">
                    {quantity}
                  </span>
                </div>
              </div>
              <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                <div className="card-body">
                  <span className="font-bold text-lg">{getArticleCount}
                   </span>
                  <span className="font-semibold">{total ? (<p>Total : {total} €</p>): (<p></p>)}  </span>
                  <div className="card-actions">
                    <Link href="/panier"> <button className="btn btn-primary btn-block">Voir mon panier</button></Link>
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
                    <li><Link href="/moncompte">Mon compte</Link></li>
                    <li><Link href="/mescommandes">Commandes</Link></li>
                    <li><button onClick={handleClickForLogout}><Link href="/">Se déconnecter</Link></button></li>
                  </>
                ) : (
                  <>
                    <li><Link href="/connexion" className="hover:text-gray-400">Connexion</Link></li>
                    <li><Link href="/inscription" className="hover:text-gray-400">Inscription</Link></li>
                  </>
                )}
              </ul>
            </div>
          </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Navbar;