// app/debounce/page.tsx
'use client';

import { products as allProducts} from '@/app/debounce/mock/data';
import { useDebounce } from './hooks/useDebounce';
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import { ApiResponse, Product } from './debounce';

export default function DebouncePage() {
    const [text, setDebounceText] = useDebounce({ delay: 500 });
    // const [text, setDebounceText] = useState("");
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetchProdcuts();
    }, [text]);

    const fetchProdcuts = async () => {
        const request = await fetch(`/debounce/api/products?name=${text}`);
        const data = await request.json() as ApiResponse<Product[]>;
        
        setProducts(data.data ?? []);
    }


    const onChange = (event: ChangeEvent<HTMLInputElement>) =>
    {
        setDebounceText(event.currentTarget.value);
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold mb-4">Search Products</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Type to search products. The search will use debounce to optimize API calls.
                    </p>
                </div>

                {/* Search Input */}
                <div className="mb-8">
                    <div className="max-w-md">
                        <input
                            type="text"
                            placeholder="Search product by name..."
                            onChange={onChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        // Will implement onChange with debounce
                        />
                    </div>
                </div>

                {/* Products Grid */}
                <div>
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-2xl font-semibold">Products</h2>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {products.length} products
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-md dark:hover:shadow-gray-800/20 transition-shadow"
                            >
                                <div className="mb-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-semibold">{product.name}</h3>
                                        <span className={`text-xs px-2 py-1 rounded-full ${product.inStock ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'}`}>
                                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                        {product.description}
                                    </p>
                                    <span className="text-xs text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                        {product.category}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-bold">${product.price}</span>
                                    <span className="text-sm text-gray-500">#{product.id}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}