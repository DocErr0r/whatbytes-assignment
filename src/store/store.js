'use client';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import filterReducer from './slices/filterSlice';

const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        filters: filterReducer,
    },
});

if (typeof window !== 'undefined') {
    store.subscribe(() => {
        const state = store.getState();
        try {
            localStorage.setItem('cart', JSON.stringify(state.cart.items));
        } catch {}
    });
}

export default store;
