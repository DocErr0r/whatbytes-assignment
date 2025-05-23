'use client';
import { useParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import { Star } from 'lucide-react';
import Image from 'next/image';

export default function ProductDetailPage() {
    const { Id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(state => state.products.products.find(p => p.id === Number(Id)));

    if (!product) {
        return <div className="p-8 text-center">Product not found.</div>;
    }

    return (
        <div className="container mx-auto p-6 flex flex-col md:flex-row gap-8 bg-white rounded shadow">
            <div className="flex-1 flex justify-center items-center">
                <Image src={product.image} alt={product.title} width={350} height={350} className=" h-full w-full object-contain rounded" />
            </div>
            <div className="flex-1 flex flex-col gap-4">
                <h2 className="text-2xl font-bold">{product.title}</h2>
                <div className="text-lg font-semibold text-blue-900">${product.price}</div>
                <div className="flex items-center gap-2 text-blue-700">
                    <Star color="black" fill="blue" stroke="0" size={20} />
                    <span>{product.rating}</span>
                </div>
                <div className="text-gray-700">{product.description}</div>
                <div className="text-sm text-gray-500">Category: {product.category}</div>
                <div className="text-sm text-gray-500">Brand: {product.brand}</div>
                <button onClick={() => dispatch(addToCart(product))} className="mt-4 w-full bg-blue-700 text-white px-4 py-2 rounded font-bold">Add to Cart</button>
            </div>
        </div>
    );
}
