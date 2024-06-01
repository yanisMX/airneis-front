"use client";
import { useEffect, useState } from 'react';
import {getCallAPI} from '../api/getCallAPI';
import { Product } from '../interfaces/interfaces';
import ProductComponent from './ProductComponent';


const SearchBar = () => {

    const API_FOR_SEARCH = 'https://c1bb0d8a5f1d.airneis.net/api/products?search=';

    const [search, setSearch] = useState("");
    const [products, setProducts] = useState<Product[] | null>(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSearch(event.target.value);
    };

    const fetchDataProducts = async () => {
        if (search.length >= 3) {
            try {
                const response = await getCallAPI(API_FOR_SEARCH + search);
                if (response.products.length > 0) {
                    setProducts(response.products);
                    setErrorMessage('');
                } else {
                    setProducts(null);
                    setErrorMessage("Aucun produit trouvé");
                }
            } catch (error) {
                setErrorMessage("Erreur lors de la récupération des produits");
                setProducts(null);
            }
        } else {
            setProducts(null);
            setErrorMessage("Veuillez saisir au moins 3 caractères");
        }
    }
    


    useEffect(() => {
        fetchDataProducts();
    }, [search]);

    return (

        <section className="content-below-navbar flex flex-col items-center justify-center">
            <h1 className="mb-6 text-center text-4xl font-bold tracking-tight text-gray-900">Rechercher</h1>
            <form className="w-full max-w-md" onSubmit={(e) => e.preventDefault}>
                <label className="flex items-center gap-2 w-full input input-bordered">
                    <input
                        type="text"
                        className="grow p-2"
                        placeholder="Rechercher"
                        value={search} // Associer la valeur du champ à l'état 'search'
                        onChange={handleSearchChange} // Gérer le changement de valeur du champ
                    />
                    
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70" >
                            <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd" />
                        </svg>
                    
                </label>
            </form>
            <ul className="sm:flex flex flex-wrap ml-8">
                {products ? (products.map((product, i) => (
                    <ProductComponent product={product} i={i} key={i} />
                ))) : (<p className="mt-7 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded">{errorMessage}</p>)}
            </ul>
        </section>)
}
export default SearchBar;