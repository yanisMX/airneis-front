"use client";
import { useEffect, useState } from 'react';
import getCallAPI from '../API/getCallAPI';
import { Product } from '../interfaces/interfaces';
import ProductComponent from './ProductComponent';


const SearchBar = () => {

    const [search, setSearch] = useState("");
    const [products, setProducts] = useState<Product[] | null>(null);
    const API_FOR_SEARCH = 'https://c1bb0d8a5f1d.airneis.net/api/products?search=';

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSearch(event.target.value);
    };

    const fetchDataProducts = async () => {
        if(search.length > 3){
            const response = await getCallAPI(API_FOR_SEARCH + search);
            setProducts(response.products);
        } else {
            setProducts(null);
        }
    }


    useEffect(() => {
        fetchDataProducts();
    }, [search]);

    return (

        <section className="content-below-navbar flex flex-col items-center justify-center">
            <h1 className="mb-6 text-center text-4xl font-bold tracking-tight text-gray-900">Rechercher</h1>
            <form className="w-full max-w-md" >
                <label className="flex items-center gap-2 w-full input input-bordered">
                    <input
                        type="text"
                        className="grow p-2"
                        placeholder="Rechercher"
                        value={search} // Associer la valeur du champ à l'état 'search'
                        onChange={handleSearchChange} // Gérer le changement de valeur du champ
                    />
                    <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70" >
                            <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd" />
                        </svg>
                    </button>
                </label>
            </form>
            <ul className="sm:flex flex flex-wrap ml-8">
                {products ? (products.map((product, i) => (
                    <ProductComponent product={product} i={i} key={i} />
                ))) : (<p></p>)}
            </ul>
        </section>)
}
export default SearchBar;