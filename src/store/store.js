'use client';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import filterReducer from './slices/filterSlice';

const store = configureStore({
    reducer: {
        products: productsReducer,
        filters: filterReducer,
    },
});

export default store;
