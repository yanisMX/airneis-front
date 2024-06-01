"use client";
import { useEffect, useState } from 'react';
import { getCallAPI } from '@/app/api/getCallAPI';
import { Product } from '@/app/interfaces/interfaces';
import { handleAddToCart } from '@/app/utils/cartUtils';
import { useCart } from '@/app/context/CartContext';
import Image from 'next/image';
import { useAuth } from '@/app/context/AuthContext';
import patchCallAPIWithToken from '@/app/api/patchCallAPI';


const ProductDetailsPage = ({ params }: { params: { slug: string } }) => {

    const API_FOR_PRODUCT = `https://c1bb0d8a5f1d.airneis.net/api/products/slug/${params.slug}`;
    const API_FOR_ADD_TO_CART = 'https://c1bb0d8a5f1d.airneis.net/api/user/basket';


    const [product, setProduct] = useState<Product | null>(null);
    const { shoppingCart, setShoppingCart } = useCart();
    const { isLoggedIn } = useAuth();
    const [messageDisplay, setMessageDisplay] = useState('');
    const { user } = useAuth();


    const addToCartForUserConnected = async () => {
        if (product && user && user.accessToken) {
            try {
                if (shoppingCart.items.some(item => item.product.id === product.id)) {
                    const updatedCart = handleAddToCart(product, shoppingCart);
                    setShoppingCart(updatedCart);
                } else {
                    const response = await patchCallAPIWithToken(API_FOR_ADD_TO_CART, { productId: product.id, quantity: 1 }, user.accessToken);
                    if (response.success) {
                        setMessageDisplay("Produit ajouté au panier.");
                    } else {
                        setMessageDisplay("Impossible d'ajouter le produit au panier.");
                    }
                }
            } catch (error: any) {
                console.error(error.message);
            }
        }
    }

    const addToCartForUserNotConnected = () => {
        if (product) {
            const updatedCart = handleAddToCart(product, shoppingCart);
            setShoppingCart(updatedCart);
        } else {
            console.error("Impossible d'ajouter le produit au panier.");
        }
    }

    const addToCart = (): void => {
        if (product && isLoggedIn) {
            addToCartForUserConnected();
        } else if (product && !isLoggedIn) {
            addToCartForUserNotConnected();
        }
    };

    const fetchDataProduct = async () => {
        const response = await getCallAPI(API_FOR_PRODUCT);
        try {
            if (response.success) {
                setProduct(response.product);
            } else {
                console.error("Impossible de récupérer le produit");
            }
        } catch (error: any) {
            console.error(error.message);
        }
    };

    useEffect((): void => {
        fetchDataProduct();
    }, [params.slug]);

    return (
        <main className='pt-[40px] content-below-navbar min-h-screen'>
            {product ? (
                <>
                    <section className="py-12 sm:py-16">
                        <div className="container mx-auto px-4">
                            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
                                <div className="lg:col-span-3">
                                    <div className="aspect-w-3 aspect-h-2">
                                        <a className="relative flex h-96 w-96 overflow-hidden rounded-lg shadow-lg" href="#">
                                            <Image
                                                className="absolute top-0 right-0 h-full w-full object-cover"
                                                src={`https://c1bb0d8a5f1d.airneis.net/medias/serve/${product.images[0].filename}`}
                                                alt={product.name}
                                                layout='fill'
                                            />
                                            <div className="absolute bottom-0 mb-4 flex w-full justify-center space-x-4">
                                                <div className="h-3 w-3 rounded-full border-2 border-white bg-white"></div>
                                                <div className="h-3 w-3 rounded-full border-2 border-white bg-transparent"></div>
                                                <div className="h-3 w-3 rounded-full border-2 border-white bg-transparent"></div>
                                            </div>
                                            <div className="absolute -right-16 bottom-0 mr-2 mb-4 space-y-2 transition-all duration-300 hover:right-0">
                                                <button className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7v14" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="lg:col-span-2">
                                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{product.name}</h1>
                                    <p className="mt-4 text-gray-700">{product.description}</p>
                                    <p className="mt-4 text-lg font-semibold">{product.price} €</p>
                                    <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded" onClick={() => addToCart()}>
                                        Ajouter au panier
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                </>
            ) : (
                <div className="flex justify-center items-center h-screen">
                    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                        <span className="visually-hidden"></span>
                    </div>
                </div>
            )}
        </main>
    );
}

export default ProductDetailsPage;
