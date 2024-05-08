"use client";
import { useEffect, useState } from 'react';
import Link from "next/link";
import getCallAPI from '@/app/API/getCallAPI';

const ProductDetailsPage = ({ params }: { params: { slug: string } }) => {
    const [product, setProduct] = useState<any | null>(null);
    const API_FOR_PRODUCT = `https://c1bb0d8a5f1d.airneis.net/api/products/slug/${params.slug}`;

    useEffect(() => {
        const fetchDataProduct = async () => {
            const response = await getCallAPI(API_FOR_PRODUCT);
            setProduct(response.product);
        };

        fetchDataProduct();
    }, [params.slug]); // Ensuring that the useEffect is correctly dependent on params.slug

    return (
        <main className='pt-[40px]'>
            {product ? (
                <>
                    <section className="py-12 sm:py-16">
                        <div className="container mx-auto px-4">
                            <nav className="flex mb-4">
                                <ol role="list" className="flex items-center space-x-2 text-sm font-medium text-gray-600">
                                    <li><Link href="/" className="hover:text-gray-800">Home</Link></li>
                                    <li>/</li>
                                    <li><Link href="/pages/produits" className="hover:text-gray-800">Products</Link></li>
                                    <li>/</li>
                                    <li className="text-gray-900">{product.name}</li>
                                </ol>
                            </nav>
                            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
                                <div className="lg:col-span-3">
                                    <div className="aspect-w-3 aspect-h-2">
                                        <a className="relative flex h-96 w-96 overflow-hidden rounded-lg shadow-lg" href="#">
                                            <img 
                                                className="absolute top-0 right-0 h-full w-full object-cover" 
                                                src={`https://c1bb0d8a5f1d.airneis.net/medias/serve/${product.images[0].filename}`} 
                                                alt={product.name} 
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
                                    <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="container mx-auto px-4">
                        <h2 className="text-xl font-bold text-gray-900">Related Products</h2>
                        <div className="my-10 flex w-full max-w-xs flex-col overflow-hidden bg-white">
                            <a className="relative flex h-80 w-72 overflow-hidden" href="#">
                                <img className="absolute top-0 right-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGJsYXplcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="product image" />
                                <div className="absolute bottom-0 mb-4 flex w-full justify-center space-x-4">
                                    <div className="h-3 w-3 rounded-full border-2 border-white bg-white"></div>
                                    <div className="h-3 w-3 rounded-full border-2 border-white bg-transparent"></div>
                                    <div className="h-3 w-3 rounded-full border-2 border-white bg-transparent"></div>
                                </div>
                                <div className="absolute -right-16 bottom-0 mr-2 mb-4 space-y-2 transition-all duration-300 hover:right-0">
                                    <button className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                                    </button>
                                </div>
                            </a>
                            <div className="mt-4 pb-5">
                                <a href="#">
                                    <h5 className="text-center tracking-tight text-gray-500">Piped Linen Blend Blazer</h5>
                                </a>
                                <div className="mb-5 flex justify-center">
                                    <p>
                                        <span className="text-sm font-bold text-gray-900">$179</span>
                                        <span className="text-sm text-gray-400 line-through">$499</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
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
