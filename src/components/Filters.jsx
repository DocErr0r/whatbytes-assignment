'use client';
import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories, setBrands, setMinPrice, setMaxPrice, clearFilters } from '@/store/slices/filterSlice';

export default function Filters() {
    const dispatch = useDispatch();
    const selectedCategories = useSelector(state => state.filters.categories);
    const selectedBrands = useSelector(state => state.filters.brands);
    const minPrice = useSelector(state => state.filters.minPrice);
    const maxPrice = useSelector(state => state.filters.maxPrice);
    const PRICE_MIN_LIMIT = 0;
    const PRICE_MAX_LIMIT = 10000;

    const handleSelectionChange = (itemType, itemValue) => {
        let currentSelection;
        let setter;
        if (itemType === 'category') {
            currentSelection = selectedCategories;
            setter = (val) => dispatch(setCategories(Array.from(val)));
        } else if (itemType === 'brand') {
            currentSelection = selectedBrands;
            setter = (val) => dispatch(setBrands(Array.from(val)));
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

    const handleClearFilters = () => {
        dispatch(clearFilters());
    };

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
                            <input type="checkbox" id={`category-${category}`} className="form-checkbox h-5 w-5 text-blue-500 rounded-md border-gray-300 focus:ring-blue-500 cursor-pointer" checked={selectedCategories.includes(category)} onChange={() => handleSelectionChange('category', category)} />
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
                    <input type="number" placeholder="Min" className="w-1/2 p-2 rounded-lg bg-blue-800 text-white border border-blue-600 focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50 text-center" value={minPrice} onChange={(e) => dispatch(setMinPrice(Number(e.target.value)))} />
                    <span className="text-white">-</span>
                    <input type="number" placeholder="Max" className="w-1/2 p-2 rounded-lg bg-blue-800 text-white border border-blue-600 focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50 text-center" value={maxPrice} onChange={(e) => dispatch(setMaxPrice(Number(e.target.value)))} />
                </div>
            </div>
            <div className="pb-4">
                <h4 className="text-xl text-white mb-3">Brand</h4>
                <ul className="space-y-3">
                    {brands.map((brand) => (
                        <li key={brand} className="flex items-center text-white">
                            <input type="checkbox" id={`brand-${brand}`} className="form-checkbox h-5 w-5 text-blue-500 rounded-md border-gray-300 focus:ring-blue-500 cursor-pointer" checked={selectedBrands.includes(brand)} onChange={() => handleSelectionChange('brand', brand)} />
                            <label htmlFor={`brand-${brand}`} className="ml-3 text-lg cursor-pointer hover:text-blue-200">
                                {brand}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={handleClearFilters} className="mt-4 w-full py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors shadow-md">
                Clear Filters
            </button>
        </div>
    );
}
