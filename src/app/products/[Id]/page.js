'use client';
import { useParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

function getStarFill(index, rating) {
    if (rating >= index + 1) return '#2563eb'; // full
    if (rating > index && rating < index + 1) {
        const percent = rating - index;
        if (percent >= 0.75) return 'url(#star-75)';
        if (percent >= 0.5) return 'url(#star-50)';
        if (percent >= 0.25) return 'url(#star-25)';
    }
    return '#e5e7eb'; 
}

function StarSVG({ fill }) {
    if (fill.startsWith('url')) {
        let id = fill.replace('url(#', '').replace(')', '');
        let stops = [];
        if (id === 'star-75') stops = [0.75, 0.25];
        else if (id === 'star-50') stops = [0.5, 0.5];
        else if (id === 'star-25') stops = [0.25, 0.75];
        return (
            <svg width={20} height={20} viewBox="0 0 24 24">
                <defs>
                    <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
                        <stop offset={`${stops[0] * 100}%`} stopColor="#2563eb" />
                        <stop offset={`${stops[0] * 100}%`} stopColor="#e5e7eb" />
                    </linearGradient>
                </defs>
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill={`url(#${id})`} />
            </svg>
        );
    }
    return <Star size={20} fill={fill} color={fill} strokeWidth={0} />;
}

export default function ProductDetailPage() {
    const { Id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(state => state.products.products.find(p => p.id === Number(Id)));
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return <div className="p-8 text-center">Product not found.</div>;
    }


    const reviews = [
        {
            user: 'Alice',
            comment: 'Great product! Highly recommend.',
            rating: 5
        },
        {
            user: 'Bob',
            comment: 'Good value for the price.',
            rating: 4
        },
        {
            user: 'Charlie',
            comment: 'Decent, but could be better.',
            rating: 3
        }
    ];

    return (
        <div className='container mx-auto p-6 bg-white rounded shadow'>
            <div className=" flex flex-col md:flex-row gap-8 ">
                <div className="flex-1 flex justify-center items-center">
                    <Image src={product.image} alt={product.title} width={350} height={350} className="h-full w-full object-contain rounded" />
                </div>
                <div className="flex-1 flex flex-col gap-4">
                    <h2 className="text-2xl font-bold">{product.title}</h2>
                    <div className="text-lg font-semibold text-blue-900">${product.price}</div>
                    <div className="flex items-center gap-2 text-blue-700">
                        {[...Array(5)].map((_, i) => (
                            <StarSVG key={i} fill={getStarFill(i, product.rating)} />
                        ))}
                        <span className="ml-2 text-gray-700">{product.rating}</span>
                    </div>
                    <div className="text-gray-700">{product.description}</div>
                    <div className="text-sm text-gray-500">Category: {product.category}</div>
                    <div className="text-sm text-gray-500">Brand: {product.brand}</div>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="font-semibold">Quantity:</span>
                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-2 py-1 bg-blue-200 text-blue-700 rounded">-</button>
                        <span className="px-2">{quantity}</span>
                        <button onClick={() => setQuantity(q => q + 1)} className="px-2 py-1 bg-blue-200 text-blue-700 rounded">+</button>
                    </div>
                    <button onClick={() => { for (let i = 0; i < quantity; i++) dispatch(addToCart(product)); }} className="mt-4 w-full bg-blue-700 text-white px-4 py-2 rounded font-bold">Add to Cart</button>
                </div>
            </div>
            <div className="mt-8">
                <h3 className="text-xl font-bold mb-2">Reviews</h3>
                <div className="space-y-4">
                    {reviews.map((review, idx) => (
                        <div key={idx} className="border-b pb-2">
                            <div className="flex items-center gap-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill={i < review.rating ? '#2563eb' : '#e5e7eb'} color={i < review.rating ? '#2563eb' : '#e5e7eb'} strokeWidth={0} />
                                ))}
                                <span className="font-semibold ml-2">{review.user}</span>
                            </div>
                            <div className="text-gray-700 ml-1">{review.comment}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
