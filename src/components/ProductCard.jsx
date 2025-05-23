import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';

export default function ProductCard({ product }) {
    const dispatch = useDispatch();
    return (
        <div className="p-4 rounded shadow-sm hover:shadow-2xl transition duration-300">
            <Link href={`/product/${product.id}`}>
                <Image src={product.image} alt={product.title} height={100} width={100} className="h-52 w-[100%] object-cover" />
            </Link>
            <h3 className="mt-2 font-semibold">{product.title}</h3>
            <div className="flex items-center justify-between my-1">
                <p>${product.price}</p>
                <span className="flex items-center text-xs text-gray-500">
                    <Star color="black" fill="blue" stroke="0" size={16} />
                    {product.rating}
                </span>
            </div>
            <button className="mt-2 w-full bg-blue-700 text-white px-4 py-1 rounded" onClick={() => dispatch(addToCart(product))}>
                Add to Cart
            </button>
        </div>
    );
}
