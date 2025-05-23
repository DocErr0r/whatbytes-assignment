'use client';
import Link from 'next/link';
import { ShoppingCart, User, Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '@/store/slices/filterSlice';
import { useEffect, useState } from 'react';

export default function Header() {
    const dispatch = useDispatch();
    const search = useSelector((state) => state.filters.search);
    const cart = useSelector((state) => state.cart.items);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    
    return (
        <header className="flex sticky top-0 z-50 justify-between text-white bg-blue-700 items-center p-4 shadow-md">
            <div className="text-3xl font-bold">Logo</div>

            <div className="flex relative justify-center w-1/3">
                <Search className="absolute ml-2 mt-2 left-0" />
                <input type="text" placeholder="Search for products..." className="border p-2 pl-10 rounded w-full" value={search} onChange={(e) => dispatch(setSearch(e.target.value))} />
            </div>

            <div className="flex items-center space-x-4">
                <Link  href="/cart" className="relative bg-blue-950 flex text-center justify-center py-2 px-2 md:px-7 gap-2 font-bold rounded-xl">
                    <ShoppingCart />
                    {mounted && <label className="text-sm md:text-base absolute -top-2 -right-3 bg-red-500 rounded-full px-2">{cart.length}</label>}
                    <span className="hidden md:flex ">Cart</span>
                </Link>
                <div className="bg-blue-950 p-2 rounded-full">
                    <User />
                </div>
            </div>
        </header>
    );
}
