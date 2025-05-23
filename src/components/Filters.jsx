'use client';
import React, { useState,useEffect } from 'react';

export default function Filters() {
    const [selectedCategories, setSelectedCategories] = useState(new Set());
    const [selectedBrands, setSelectedBrands] = useState(new Set());
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const PRICE_MIN_LIMIT = 0;
    const PRICE_MAX_LIMIT = 10000;

    const handleSelectionChange = (itemType, itemValue) => {
        let currentSelection;
        let setter;
        if (itemType === 'category') {
            currentSelection = selectedCategories;
            setter = setSelectedCategories;
        } else if (itemType === 'brand') {
            currentSelection = selectedBrands;
            setter = setSelectedBrands;
        }

        const newSelection = new Set(currentSelection);
        if (itemValue === 'All') {
            if (newSelection.has('All') && newSelection.size === 1) {
                newSelection.clear();
            } else {
                newSelection.clear();
                newSelection.add('All');
            }
        } else {
            if (newSelection.has('All')) {
                newSelection.delete('All');
            }
            if (newSelection.has(itemValue)) {
                newSelection.delete(itemValue);
            } else {
                newSelection.add(itemValue);
            }
            if (newSelection.size === 0) {
                newSelection.add('All');
            }
        }
        setter(newSelection);
    };

    const handleApplyFilters = () => {
        console.log('Applying Filters:', {
            categories: Array.from(selectedCategories),
            brands: Array.from(selectedBrands),
            minPrice,
            maxPrice,
        });
    };
    const handleClearFilters = () => {
        setSelectedCategories(new Set(['All'])); 
        setSelectedBrands(new Set(['All'])); 
        setMinPrice(PRICE_MIN_LIMIT);
        setMaxPrice(PRICE_MAX_LIMIT);
    };

    useEffect(() => {
        setSelectedCategories(new Set(['All']));
        setSelectedBrands(new Set(['All']));
    }, []); 


    const categories = ['All', 'Electronics', 'Fashion', 'Home & Kitchen'];
    const brands = ['All', 'Apple', 'Brand A', 'Brand B', 'Brand C'];

    return (
        <div className="bg-blue-700 sm:flex flex-col h-[82vh] absolute sm:sticky overflow-y-auto scrollbar-hidden w-1/2 md:w-1/4 rounded-xl p-4 top-20 self-start">
            <h3 className="text-2xl font-bold text-white mb-4">Filters</h3>
            <div className="pb-4">
                <h4 className="text-xl text-white mb-3">Categories</h4>
                <ul className="space-y-1">
                    {categories.map((category) => (
                        <li key={category} className="flex items-center text-white">
                            <input type="checkbox" id={`category-${category}`} className="form-checkbox h-5 w-5 text-blue-500 rounded-md border-gray-300 focus:ring-blue-500 cursor-pointer" checked={selectedCategories.has(category)} onChange={() => handleSelectionChange('category', category)} />
                            <label htmlFor={`category-${category}`} className="ml-3 text-lg cursor-pointer hover:text-blue-200">
                                {category}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="pb-4">
                <h4 className="text-xl text-white mb-3">Price Range</h4>
                <div className="flex items-center space-x-3">
                    <input type="number" placeholder="Min" className="w-1/2 p-2 rounded-lg bg-blue-800 text-white border border-blue-600 focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50 text-center" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                    <span className="text-white">-</span>
                    <input type="number" placeholder="Max" className="w-1/2 p-2 rounded-lg bg-blue-800 text-white border border-blue-600 focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50 text-center" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                </div>
            </div>
            <div className="pb-4">
                <h4 className="text-xl text-white mb-3">Brand</h4>
                <ul className="space-y-3">
                    {brands.map((brand) => (
                        <li key={brand} className="flex items-center text-white">
                            <input type="checkbox" id={`brand-${brand}`} className="form-checkbox h-5 w-5 text-blue-500 rounded-md border-gray-300 focus:ring-blue-500 cursor-pointer" checked={selectedBrands.has(brand)} onChange={() => handleSelectionChange('brand', brand)} />
                            <label htmlFor={`brand-${brand}`} className="ml-3 text-lg cursor-pointer hover:text-blue-200">
                                {brand}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={handleApplyFilters} className="mt-4 w-full py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors shadow-md">
                Apply Filters
            </button>
            <button onClick={handleClearFilters} className="mt-4 w-full py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors shadow-md">
                Clear Filters
            </button>
        </div>
    );
}
