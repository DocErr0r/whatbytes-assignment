import { createSlice } from '@reduxjs/toolkit';

function saveCart(items) {
    if (typeof window !== 'undefined') {
        try {
            localStorage.setItem('cart', JSON.stringify(items));
        } catch {}
    }
}

function loadCart() {
    if (typeof window !== 'undefined') {
        try {
            const data = localStorage.getItem('cart');
            return data ? JSON.parse(data) : [];
        } catch {
            return [];
        }
    }
    return [];
}

const initialState = {
    items: loadCart(),
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const item = action.payload;
            const existing = state.items.find(i => i.id === item.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ ...item, quantity: 1 });
            }
            saveCart(state.items);
        },
        removeOne(state, action) {
            const id = action.payload;
            const existing = state.items.find(i => i.id === id);
            if (existing && existing.quantity > 1) {
                existing.quantity -= 1;
            } else {
                state.items = state.items.filter(i => i.id !== id);
            }
            saveCart(state.items);
        },
        removeFromCart(state, action) {
            state.items = state.items.filter(i => i.id !== action.payload);
            saveCart(state.items);
        },
        clearCart(state) {
            state.items = [];
            saveCart(state.items);
        },
    },
});

export const { addToCart, removeFromCart, clearCart, removeOne } = cartSlice.actions;
export default cartSlice.reducer;
