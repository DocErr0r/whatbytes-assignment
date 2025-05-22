import Link from 'next/link';
import { ShoppingCart, User, Search } from 'lucide-react';

export default function Header() {
    return (
        <header className="flex justify-between text-white bg-blue-700 items-center p-4 shadow-md">
            <div className="text-3xl font-bold">Logo</div>

            <div className="flex relative justify-center w-1/3">
                <Search className="absolute ml-2 mt-2 left-0" />
                <input type="text" placeholder="Search for products..." className="border p-2 pl-10 rounded w-full" />
            </div>

            <div className="flex items-center space-x-4">
                <Link href="/cart" className="bg-blue-950 flex text-center py-2 px-7 font-bold rounded-xl">
                    <ShoppingCart className="mr-2" />
                    Cart
                </Link>
                <div className="bg-blue-950 p-2 rounded-full">
                    <User />
                </div>
            </div>
        </header>
    );
}
