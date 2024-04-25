"use client";
import { useState } from 'react';
import { useEffect } from 'react';



const CategorieProductsPage = ({ params }: { params: { category: string } }) => {

    const [categoryProducts, setCategoryProducts] = useState<any | null>(null);


    useEffect(() => {
        const fetchDataCategoryProducts = async () => {
            try {
                const response = await fetch(`https://c1bb0d8a5f1d.airneis.net/api/${params.category}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const responseData = await response.json();
                setCategoryProducts(responseData);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchDataCategoryProducts();
    },);





    return (
        <div>test</div>
    )



};

export default CategorieProductsPage;