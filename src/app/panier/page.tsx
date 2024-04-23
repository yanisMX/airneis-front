import React from 'react';

const CartPage = () => {
    return (
        // Flex container to center the child div
        <div className="flex items-center justify-center "> 
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-4/6">
                <table className="w-full text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-4">
                                <span className="sr-only">Image</span>
                            </th>
                            <th scope="col" className="px-4 py-2">
                                Product
                            </th>
                            <th scope="col" className="px-4 py-2">
                                Qty
                            </th>
                            <th scope="col" className="px-4 py-2">
                                Price
                            </th>
                            <th scope="col" className="px-4 py-2">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="p-2">
                                <img src="/docs/images/products/apple-watch.png" className="w-12 md:w-24 max-w-full max-h-full" alt="Apple Watch" />
                            </td>
                            <td className="px-4 py-2 font-medium text-gray-900 dark:text-white">
                                Apple Watch
                            </td>
                            <td className="px-4 py-2">
                                <div className="flex items-center">
                                    <button className="inline-flex items-center justify-center p-0.5 text-xs font-medium h-5 w-5 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                        <span className="sr-only">Decrease quantity</span>
                                        <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                                        </svg>
                                    </button>
                                    <div>
                                        <input type="number" id="apple_watch_qty" className="bg-gray-50 w-12 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-1.5 py-0.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" required />
                                    </div>
                                    <button className="inline-flex items-center justify-center h-5 w-5 p-0.5 text-xs font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                        <span className="sr-only">Increase quantity</span>
                                        <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                        </svg>
                                    </button>
                                </div>
                            </td>
                            <td className="px-4 py-2 font-medium text-gray-900 dark:text-white">
                                $599
                            </td>
                            <td className="px-4 py-2">
                                <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CartPage;
