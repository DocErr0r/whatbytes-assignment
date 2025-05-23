'use client';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, clearCart, removeOne } from '@/store/slices/cartSlice';
import Link from 'next/link';

export default function CartPage() {
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <div className="text-center py-10">
                    <p>Your cart is empty.</p>
                    <Link href="/" className="text-blue-600 underline">Go Shopping</Link>
                </div>
            ) : (
                <>
                    <ul className="divide-y divide-gray-200">
                        {cartItems.map(item => (
                            <li key={item.id} className="flex items-center justify-between py-4">
                                <div className="flex-1">
                                    <div className="font-semibold">{item.title}</div>
                                    <div className="text-sm text-gray-500">${item.price} x {item.quantity}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => dispatch(addToCart(item))} className="px-2 py-1 bg-blue-500 text-white rounded">+</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => dispatch(removeOne(item.id))} className="px-2 py-1 bg-blue-500 text-white rounded">-</button>
                                    <button onClick={() => dispatch(removeFromCart(item.id))} className="ml-2 px-2 py-1 bg-red-600 text-white rounded">Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 flex justify-between items-center border-t pt-4">
                        <div className="font-bold text-lg">Total: ${total.toFixed(2)}</div>
                        <button onClick={() => dispatch(clearCart())} className="bg-red-600 text-white px-4 py-2 rounded">Clear Cart</button>
                    </div>
                </>
            )}
        </div>
    );
}
