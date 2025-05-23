import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }) {
    return (
        <div className="p-4 rounded flex shadow-sm hover:shadow-2xl transition duration-300">
            {/* <Image src={product.image} alt={product.title} height={100} width={100} className="" />
            <div>
                <h3 className="mt-2 font-semibold">{product.title}</h3>
                <div className="flex items-center my-1">
                    {[...Array(5)].map((_, index) => (
                            <Star color='black' stroke={0} size={18} />
                    ))}
                </div>
                <p>${product.price}</p>
                <p className="text-xs text-gray-500">{product.description}</p>
                <span className="text-xs text-gray-500 block">Category:{product.category}</span>
                <Link href={`/product/${product.id}`}>
                    <button className="mt-2 w-full bg-blue-600 text-white px-4 py-1 rounded">Add to Cart</button>
                </Link>
            </div> */}
        </div>
    );
}
