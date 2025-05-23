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

export default store;
